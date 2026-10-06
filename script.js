// 1. Configuration de Supabase
const SUPABASE_URL = "https://ehtshncvdbdhrwufjjhl.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_dEF7NKEkxnbg1GU8G_ElZA__RBaQDBx";

// 2. Initialisation du client Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 3. Ton code de l'application
console.log("Supabase initialisé avec succès :", supabase);
