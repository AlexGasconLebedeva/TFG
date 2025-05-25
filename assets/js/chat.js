  import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
  import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
  import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

    const firebaseConfig = {
      apiKey: "AIzaSyB81PYScRvR_rLofBAKeBe6mEldiyp-Qzo",
      authDomain: "tfg-alexgascon.firebaseapp.com",
      projectId: "tfg-alexgascon",
      storageBucket: "tfg-alexgascon.firebasestorage.app",
      messagingSenderId: "388739128309",  
      appId: "1:388739128309:web:4e422d9a5f3d80f1eddebc"
    };

  const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
  const auth = getAuth(app);
  const db = getDatabase(app);

  const chatToggle = document.getElementById("chat-toggle");
  const chatWindow = document.getElementById("chat-window");
  const closeBtn = document.getElementById("close-chat");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.getElementById("chat-messages");

  let conversationRef;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      const role = uid === 'ADMIN_UID' ? 'admin' : 'user';  // Aquí puedes comprobar si es admin
      const conversationId = role === 'admin' ? 'admin_chat' : `user_chat_${uid}`;
      conversationRef = ref(db, `chats/${conversationId}/messages`);

      chatForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (!message) return;

        await push(conversationRef, {
          uid: user.uid,
          text: message,
          timestamp: Date.now(),
          role: role
        });
        chatInput.value = "";
      });

      onChildAdded(conversationRef, (snapshot) => {
        const msg = snapshot.val();
        const div = document.createElement("div");
        div.textContent = `${msg.role === 'admin' ? 'Admin' : 'Usuario'}: ${msg.text}`;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      });
    }
  });

  chatToggle.addEventListener("click", () => chatWindow.classList.toggle("hidden"));
  closeBtn.addEventListener("click", () => chatWindow.classList.add("hidden"));

