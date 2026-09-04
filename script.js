document.querySelectorAll('button').forEach(btn => {
  if (btn.textContent.includes('INVESTIR')) {
    btn.addEventListener('click', () => {
      alert('La fonction d’investissement sera activée après la mise en place du compte et du système de paiement.');
    });
  }
});

document.querySelector('.deposit').addEventListener('click', () => {
  alert('La page Dépôt sera ajoutée à l’étape suivante.');
});

document.querySelector('.withdraw').addEventListener('click', () => {
  alert('La page Retrait sera ajoutée à l’étape suivante.');
});
