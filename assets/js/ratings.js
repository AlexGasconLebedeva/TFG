// assets/js/ratings.js
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const db = getFirestore();
const auth = getAuth();

export async function initRatingControls() {
  const starsContainers = document.querySelectorAll(".rating");

  starsContainers.forEach(container => {
    const videoId = container.dataset.videoId;

    container.querySelectorAll("span").forEach(star => {
      star.addEventListener("click", async () => {
        const ratingValue = parseInt(star.dataset.value);
        const user = auth.currentUser;

        if (!user) {
          alert("Debes iniciar sesión para valorar.");
          return;
        }

        const ratingRef = doc(db, `videos/${videoId}/ratings/${user.uid}`);
        const existing = await getDoc(ratingRef);

        if (existing.exists()) {
          alert("Ya has valorado este vídeo.");
          return;
        }

        await setDoc(ratingRef, {
          userId: user.uid,
          rating: ratingValue,
          timestamp: new Date()
        });

        alert(`Has valorado este video con ${ratingValue} estrella(s).`);
        container.querySelectorAll("span").forEach(s => s.style.pointerEvents = "none");
      });
    });
  });
}
