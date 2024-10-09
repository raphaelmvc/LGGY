function showInfluencerFields() {
  document.getElementById('influencer-fields').classList.remove('hidden');
  document.getElementById('company-fields').classList.add('hidden');
}

function showCompanyFields() {
  document.getElementById('company-fields').classList.remove('hidden');
  document.getElementById('influencer-fields').classList.add('hidden');
}

// Para abrir o popup
document.querySelector('.contact-button').addEventListener('click', function() {
  document.getElementById('contact-popup').style.display = 'flex'; // ou 'block' conforme seu estilo
  showInfluencerFields(); // Mostra os campos de Influencer por padrão
});

// Para fechar o popup
document.getElementById('popup-close').addEventListener('click', function() {
  document.getElementById('contact-popup').style.display = 'none';
});