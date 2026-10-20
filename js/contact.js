/* Contacto accesible, preparado para EmailJS con fallback real a Gmail web.
   Nunca anuncia éxito antes de recibir respuesta 200 del servicio. */
(() => {
  'use strict';
  const EMAIL = 'angelica.m.torres.morales@gmail.com';
  const REQUESTS = {
    negocio: {label:'Página web para negocio', subject:'Cotización de página web',message:'Hola, me interesa solicitar información sobre el desarrollo de una página web para mi negocio.'},
    evento: {label:'Invitación y evento',subject:'Consulta sobre invitación digital',message:'Hola, me gustaría recibir información sobre una invitación digital personalizada.'},
    programacion: {label:'Curso de programación',subject:'Información del curso y clase muestra',message:'Hola, me interesa conocer el curso de desarrollo web y la clase muestra gratuita.'},
    general: {label:'Consulta general',subject:'Consulta de servicios digitales',message:'Hola, me gustaría contarte una idea y conocer tus servicios digitales.'}
  };
  const credentials = window.ESTUDIO_EMAILJS || {};
  const emailjsReady = Boolean(credentials.serviceId?.trim() && credentials.templateId?.trim() && credentials.publicKey?.trim());
  const dialog = document.getElementById('contact-dialog');
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const fallback = document.querySelector('[data-emailjs-pending]');
  const activeForm = document.querySelector('[data-emailjs-ready]');
  const gmail = document.getElementById('compose-gmail');
  let originalFocus = null;
  let context = 'general';
  let sending = false;
  let lastSent = 0;

  if (activeForm) activeForm.hidden = !emailjsReady;
  if (fallback) fallback.hidden = emailjsReady;
  function composeUrl(which) {
    const req = REQUESTS[which] || REQUESTS.general;
    const params = new URLSearchParams({view:'cm',fs:'1',to:EMAIL,su:req.subject,body:req.message});
    return `https://mail.google.com/mail/?${params.toString()}`;
  }
  function setContext(which) {
    context = REQUESTS[which] ? which : 'general';
    if (gmail) gmail.href = composeUrl(context);
    if (form) {
      const select = form.elements.namedItem('service');
      if (select) select.value=context;
      const message = form.elements.namedItem('message');
      if (message && !message.value.trim()) message.value=REQUESTS[context].message;
      if (status) status.textContent='';
    }
  }
  function show(which, trigger) {
    if (!dialog?.showModal) {
      window.open(composeUrl(which),'_blank','noopener,noreferrer');
      return;
    }
    originalFocus = trigger || document.activeElement;
    setContext(which);
    dialog.showModal();
  }
  document.querySelectorAll('a[data-contact]').forEach(link=>{
    link.addEventListener('click',(event)=>{
      event.preventDefault();
      show(link.dataset.contact,link);
    });
    link.href='#contacto';
    link.removeAttribute('target');link.removeAttribute('rel');
    link.setAttribute('aria-haspopup','dialog');
  });
  dialog?.querySelector('[data-dialog-close]')?.addEventListener('click',()=>dialog.close());
  dialog?.addEventListener('click',event=>{
    if(event.target===dialog)dialog.close();
  });
  dialog?.addEventListener('close',()=>{ if(originalFocus?.isConnected)originalFocus.focus();});
  function copyEmail(button) {
    const statusEl=button.closest('.site-footer')?.querySelector('[data-copy-status]') || dialog?.querySelector('[data-copy-status]');
    if(!navigator.clipboard?.writeText) {
      if(statusEl)statusEl.textContent=`Copia esta dirección: ${EMAIL}`;
      return;
    }
    navigator.clipboard.writeText(EMAIL).then(()=>{
      if(statusEl)statusEl.textContent='Correo copiado: '+EMAIL;
    }).catch(()=>{if(statusEl)statusEl.textContent=`Copia esta dirección: ${EMAIL}`;});
  }
  document.querySelectorAll('[data-copy-email]').forEach(button=>button.addEventListener('click',()=>copyEmail(button)));

  form?.addEventListener('input',()=>{ if(status && status.dataset.state !== 'success')status.textContent='';});
  form?.addEventListener('submit', async event=>{
    event.preventDefault();
    if(sending || !emailjsReady || !form.reportValidity())return;
    const honey=String(form.elements.namedItem('website')?.value||'').trim();
    if(honey){status.textContent='No fue posible procesar la solicitud. Por favor, utiliza el correo indicado.';return;}
    if(Date.now()-lastSent<15000){status.textContent='Espera unos segundos antes de enviar otra consulta.';return;}
    sending=true;
    const button=form.querySelector('[type=submit]');
    button.disabled=true;
    if(status){status.dataset.state='';status.textContent='Enviando tu mensaje...';}
    const ctl=new AbortController();
    const cutoff=setTimeout(()=>ctl.abort(),16000);
    const data=new FormData(form);
    const service=REQUESTS[data.get('service')] || REQUESTS.general;
    try {
      const response=await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method:'POST',headers:{'Content-Type':'application/json'},signal:ctl.signal,
        body:JSON.stringify({
          service_id:credentials.serviceId,
          template_id:credentials.templateId,
          user_id:credentials.publicKey,
          template_params:{
            from_name:String(data.get('from_name')).trim(),
            reply_to:String(data.get('reply_to')).trim(),
            service:service.label,
            subject:service.subject,
            message:String(data.get('message')).trim()
          }
        })
      });
      if(!response.ok)throw Error(`EmailJS HTTP ${response.status}`);
      lastSent=Date.now();
      if(status){status.dataset.state='success';status.textContent='Mensaje enviado. Gracias por escribirme; te responderé por correo.';}
      form.reset();
    } catch(err) {
      if(status){status.dataset.state='error';status.textContent='No pudimos confirmar el envío. Intenta nuevamente o escribe al correo indicado.';}
      console.warn('Contact delivery not confirmed:',err?.message||err);
    } finally {
      clearTimeout(cutoff);
      sending=false;button.disabled=false;
    }
  });
})();
