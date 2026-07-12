const nav=document.querySelector('.primary-nav');
const btn=document.querySelector('.menu-toggle');
if(btn){btn.addEventListener('click',()=>{const open=nav.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));btn.setAttribute('aria-label',open?'Close menu':'Open menu')})}
const page=document.body.dataset.page;
document.querySelectorAll('[data-page]').forEach(a=>{if(a.dataset.page===page)a.classList.add('active')});
document.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav?.classList.remove('open');btn?.setAttribute('aria-expanded','false')}));

const form=document.getElementById('contactForm');
if(form){
  const status=document.getElementById('formStatus');
  const submitButton=form.querySelector('button[type="submit"]');
  const buttonText=submitButton.querySelector('.button-text');
  form.addEventListener('submit',async event=>{
    event.preventDefault();
    status.className='form-status';
    if(!form.checkValidity()){
      form.reportValidity();
      status.textContent='Please complete the required fields.';
      status.classList.add('error');
      return;
    }
    submitButton.disabled=true;
    buttonText.textContent='Sending…';
    status.textContent='Sending your enquiry…';
    try{
      const response=await fetch('https://api.web3forms.com/submit',{method:'POST',body:new FormData(form)});
      const result=await response.json();
      if(!response.ok||!result.success) throw new Error(result.message||'Submission failed');
      form.reset();
      status.textContent='Thank you — your message has been sent successfully.';
      status.classList.add('success');
    }catch(error){
      status.textContent='Sorry, your message could not be sent. Please email enquiries.bftcic@gmail.com or call +44 7595 957777.';
      status.classList.add('error');
    }finally{
      submitButton.disabled=false;
      buttonText.textContent='Send enquiry';
    }
  });
}
