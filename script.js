// 1. Initialisation de Supabase
const SUPABASE_URL = "https://ehtshncvdbdhrwufjjhl.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_dEF7NKEkxnbg1GU8G_ElZA__RBaQDBx";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. Gestion des fenêtres surgissantes (Modales)
function openModal(id) {
  document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

// 3. Affichage des messages Toast
const toast = document.getElementById("toast");

function showMessage(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// 4. Inscription
async function handleRegister() {
  const name = document.getElementById("reg-name").value;
  const phone = document.getElementById("reg-phone").value;
  const email = document.getElementById("reg-email").value;
  const password = document.getElementById("reg-password").value;

  if (!email || !password) {
    showMessage("Veuillez remplir l'email et le mot de passe");
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name, phone: phone }
    }
  });

  if (error) {
    showMessage("Erreur : " + error.message);
  } else {
    showMessage("Compte créé avec succès !");
    closeModal("register-modal");
    checkUserSession();
  }
}

// 5. Connexion
async function handleLogin() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    showMessage("Erreur : " + error.message);
  } else {
    showMessage("Connexion réussie !");
    closeModal("login-modal");
    checkUserSession();
  }
}

// 6. Déconnexion
async function logout() {
  await supabase.auth.signOut();
  showMessage("Déconnecté");
  checkUserSession();
}

// 7. Vérification de l'état de la session
async function checkUserSession() {
  const { data: { user } } = await supabase.auth.getUser();

  const authBtns = document.getElementById("auth-buttons");
  const userActions = document.getElementById("user-actions");

  if (user) {
    if (authBtns) authBtns.style.display = "none";
    if (userActions) userActions.style.display = "flex";

    document.getElementById("user-email").textContent = user.email;
    document.getElementById("user-name").textContent = user.user_metadata?.full_name || "Non renseigné";
    document.getElementById("user-phone").textContent = user.user_metadata?.phone || "Non renseigné";
  } else {
    if (authBtns) authBtns.style.display = "flex";
    if (userActions) userActions.style.display = "none";

    document.getElementById("user-email").textContent = "Non renseigné";
    document.getElementById("user-name").textContent = "Non renseigné";
    document.getElementById("user-phone").textContent = "Non renseigné";
  }
}

// 8. Traitement Dépôt & Retrait (Exemple simple)
function handleDepot() {
  const amount = document.getElementById("depot-amount").value;
  if (!amount) return showMessage("Entrez un montant");
  
  const soldeEl = document.getElementById("solde-val");
  soldeEl.textContent = parseInt(soldeEl.textContent) + parseInt(amount);
  
  showMessage("Dépôt pris en compte !");
  closeModal("depot-modal");
}

function handleRetrait() {
  const amount = document.getElementById("retrait-amount").value;
  if (!amount) return showMessage("Entrez un montant");

  const soldeEl = document.getElementById("solde-val");
  const soldeActuel = parseInt(soldeEl.textContent);

  if (parseInt(amount) > soldeActuel) {
    return showMessage("Solde insuffisant");
  }

  soldeEl.textContent = soldeActuel - parseInt(amount);
  showMessage("Demande de retrait transmise !");
  closeModal("retrait-modal");
}

// Exécuter la vérification au chargement
document.addEventListener("DOMContentLoaded", checkUserSession);
