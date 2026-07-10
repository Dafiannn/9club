/* ============================================================
   9CLUB — Auth sederhana (localStorage) untuk prototipe
   Catatan: password disimpan plaintext di localStorage — hanya
   untuk demo UI, bukan untuk produksi.
   ============================================================ */
const Auth = {
  key: '9club_auth',
  usersKey: '9club_auth_users',

  users(){ return JSON.parse(localStorage.getItem(this.usersKey) || '[]'); },
  _saveUsers(u){ localStorage.setItem(this.usersKey, JSON.stringify(u)); },

  seedAdmin(){
    const u = this.users();
    if(!u.find(x => x.email === 'admin@9club.id')){
      u.push({ name:'Admin 9club', email:'admin@9club.id', password:'admin123', role:'admin' });
      this._saveUsers(u);
    }
  },

  current(){ return JSON.parse(localStorage.getItem(this.key) || 'null'); },
  isAdmin(){ const c = this.current(); return !!c && c.role === 'admin'; },
  _setSession(u){ localStorage.setItem(this.key, JSON.stringify({ name:u.name, email:u.email, role:u.role })); },

  register(name, email, password){
    const u = this.users();
    if(u.find(x => x.email === email)) return { ok:false, msg:'Email sudah terdaftar.' };
    const user = { name, email, password, role:'customer' };
    u.push(user); this._saveUsers(u); this._setSession(user);
    return { ok:true, role:'customer' };
  },

  login(email, password){
    this.seedAdmin();
    const u = this.users().find(x => x.email === email && x.password === password);
    if(!u) return { ok:false, msg:'Email atau password salah.' };
    this._setSession(u);
    return { ok:true, role:u.role };
  },

  logout(){ localStorage.removeItem(this.key); },

  /* dipanggil di halaman admin; base = prefix path ke root (mis. '../') */
  requireAdmin(base = '../'){
    const c = this.current();
    if(!c || c.role !== 'admin'){ location.href = base + 'login.html?next=admin'; return false; }
    return true;
  }
};
Auth.seedAdmin();
