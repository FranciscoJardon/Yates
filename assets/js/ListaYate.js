const firebaseConfig = {
    apiKey: "AIzaSyBoU6bR_WVh2oEzzF61TFw2CruSF56FUFc",
    authDomain: "rentayachtloscabos.firebaseapp.com",
    projectId: "rentayachtloscabos",
    storageBucket: "rentayachtloscabos.appspot.com",
    messagingSenderId: "351198330910",
    appId: "1:351198330910:web:8c7fce1da62cad2fa4ae0f",
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const storage = firebase.storage();


 
MostrarYates();

function MostrarYates() {
  const MostrarYates = document.getElementById("MostrarYates");
  db.collection("Yates").onSnapshot((snapshot) => {
    MostrarYates.innerHTML = "";
    snapshot.forEach((doc) => {
      const data = doc.data();
      const docId = doc.id;
      const ListaYates = document.createElement("div");
      ListaYates.classList.add(
        "swiper-slide",
        "CardSlider",
      );
      ListaYates.innerHTML = `
      <img class="ImgCard" src="${data.FotosYate}" alt="">
                        <div class="bg-white pb-[4rem] pt-[2rem] px-[2rem] relative">
                            <img class="clip" src="assets/img/clip.png">
                            <p class="color-principal bold underline">${data.NombreYate}</p>
                            <a href="https://rentayachtloscabos1.web.app/yate.html?${docId}" class="color-principal  italic underline">VIEW MORE</a>
                        </div>
`;
      MostrarYates.appendChild(ListaYates);
    });
  });
}
