// Basic interactivity for donation selection and progress meters
(function(){
  const goal = 5000;
  let raised = 1200;

  const amountButtons = Array.from(document.querySelectorAll('.amount-button'));
  const customInput = document.getElementById('custom-amount');
  const donateNow = document.getElementById('donate-now');
  const raisedEl = document.getElementById('raised-amount');
  const progressBar = document.getElementById('progress-bar');
  const goalEl = document.getElementById('goal-amount');
  const quickDonate = document.getElementById('quick-donate');

  function formatMoney(n){
    return '$' + n.toLocaleString();
  }

  function updateProgress(){
    raisedEl.textContent = formatMoney(raised);
    goalEl.textContent = formatMoney(goal);
    const pct = Math.min(100, Math.round((raised / goal) * 100));
    progressBar.style.width = pct + '%';
    const progressRoot = document.querySelector('.call-to-action .progress');
    if(progressRoot) progressRoot.setAttribute('aria-valuenow', raised);
  }

  amountButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      amountButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      if(btn.dataset.amount === 'custom'){
        customInput.focus();
      } else {
        customInput.value = '';
      }
    });
  });

  donateNow.addEventListener('click', () => {
    const selected = document.querySelector('.amount-button.selected');
    let amount = 0;
    if(selected){
      if(selected.dataset.amount === 'custom'){
        amount = Number(customInput.value) || 0;
      } else {
        amount = Number(selected.dataset.amount) || 0;
      }
    } else {
      amount = Number(customInput.value) || 0;
    }
    if(amount <= 0){
      alert('Please choose or enter an amount to donate.');
      return;
    }
    // Simulate donation by updating raised amount
    raised += amount;
    updateProgress();
    // small confirmation
    donateNow.textContent = 'Thanks!';
    setTimeout(()=> donateNow.textContent = 'Donate', 1500);
  });

  // Quick donate $10 button
  if(quickDonate){
    quickDonate.addEventListener('click', (e) => {
      e.preventDefault();
      // select $10 and scroll to donate area
      const btn10 = document.querySelector('.amount-button[data-amount="10"]');
      btn10 && btn10.click();
      document.getElementById('donate').scrollIntoView({behavior:'smooth'});
    });
  }

  // Initialize
  updateProgress();
})();
