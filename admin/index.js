// CONFIGURACION FIREBASE
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

const CrearYate = document.getElementById("CrearYate");
const ButtonAgregarYate = document.getElementById("ButtonAgregarYate");
let YateId = "";

CrearYate.addEventListener("submit", async (e) => {
  e.preventDefault();
  const NombreYate = CrearYate.elements["NombreYate"].value;
  const Descripcion = CrearYate.elements["Descripcion"].value;
  const Bedrooms = CrearYate.elements["Bedrooms"].value;
  const Baths = CrearYate.elements["Baths"].value;
  const Food = CrearYate.elements["Food"].value;
  const Destino = CrearYate.elements["Destino"].value;
  const Actividad = CrearYate.elements["Actividad"].value;
  const Toys = CrearYate.elements["Toys"].value;
  const Precio2h = CrearYate.elements["Precio2h"].value;
  const Precio4h = CrearYate.elements["Precio4h"].value;
  const Precio6h = CrearYate.elements["Precio6h"].value;
  const Precio8h = CrearYate.elements["Precio8h"].value;
  const FuelIncluded = CrearYate.elements["FuelIncluded"].value;
  const Drinks = CrearYate.elements["Drinks"].value;
  const GuestIncluded = CrearYate.elements["GuestIncluded"].value;
  const MaxGuest = CrearYate.elements["MaxGuest"].value;
  const ExtraGuest = CrearYate.elements["ExtraGuest"].value;

  const FotosYate = CrearYate.elements["FotosYate"].files;
  const fotoURLs = []; // Array to store URLs of uploaded photos

  const ButtonAgregarYate = document.getElementById("ButtonAgregarYate");

  ButtonAgregarYate.disabled = true;
  ButtonAgregarYate.style.opacity = ".5";

  if (FotosYate.length > 0) {
    for (let i = 0; i < FotosYate.length; i++) {
      const storageRef = firebase
        .storage()
        .ref("FotosYates/" + FotosYate[i].name);
      const snapshot = await storageRef.put(FotosYate[i]);
      const fotoURL = await snapshot.ref.getDownloadURL();
      fotoURLs.push(fotoURL); // Add URL to array
    }
  }

  if (YateId) {
    const updateData = {
      NombreYate,
      Descripcion,
      Bedrooms,
      Baths,
      Food,
      Destino,
      Actividad,
      Toys,
      Precio2h,
      Precio4h,
      Precio6h,
      Precio8h,
      FuelIncluded,
      Drinks,
      GuestIncluded,
      MaxGuest,
      ExtraGuest,
    };
    if (FotosYate) {
      updateData.FotosYate = fotoURLs;
    }
    db.collection("Yates")
      .doc(YateId)
      .update(updateData)
      .then(() => {
        YateId = "";
        ButtonAgregarYate.innerText = "Crear Productos";
      })
      .catch((error) => {
        console.error("Error al actualizar el anuncio: ", error);
      });
  } else {
    db.collection("Yates")
      .add({
        NombreYate,
        Descripcion,
        Bedrooms,
        Baths,
        Food,
        Destino,
        Actividad,
        Toys,
        Precio2h,
        Precio4h,
        Precio6h,
        Precio8h,
        FuelIncluded,
        Drinks,
        GuestIncluded,
        MaxGuest,
        ExtraGuest,
        FotosYate: fotoURLs,
      })
      .then(() => {})
      .catch((error) => {
        console.error("Error al guardar el anuncio: ", error);
      });
  }
  CrearYate.reset();
  ButtonAgregarYate.disabled = false;
  ButtonAgregarYate.style.opacity = "1";
});

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
        "card",
        "w-[330px]",
        "xl:w-[370px]",
        "bg-[#053a55]",
        "text-white"
      );
      ListaYates.innerHTML = `
<img class="ImgCard" src="${data.FotosYate}" alt="">
<div class="pb-[2rem] pt-[2rem] px-[1rem] relative">
    <img class="clip" src="../assets/img/clipB.png">
    <div class="flex justify-between	"> 
        <div class="">
            <p class=" bold underline">${data.NombreYate}</p>
            <a href="https://rentayachtloscabos1.web.app/yate.html?${docId}" class=" italic underline">VIEW MORE</a>
        </div>
        <img src="../assets/img/starsB.svg">
    </div> <br>

    <div class="flex justify-between">
        <div class="flex flex-col ">
            <img class="w-5  h-10" src="../assets/img/userB.svg" alt="" />
            <p>Guests: <span>${data.MaxGuest}</span></p>
          </div>

          <div class="flex flex-col ">
            <img class="w-5  md:w-7 h-10" src="../assets/img/comoB.svg" alt="" />
            <p>Cabins: <span>${data.Bedrooms}</span></p>
          </div>

          <div class="flex flex-col ">
            <img class="w-5  md:w-6 h-10" src="../assets/img/wcB.svg" alt="" />
            <p>Restrooms: <span>${data.Baths}</span></p>
          </div>

    </div>

</div>
`;
      const ButtonEditarYate = document.createElement("div");
      ButtonEditarYate.innerHTML = `
    <div class="button-min EditarCard">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"    class="feather feather-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
    </div>
    `;
      ButtonEditarYate.addEventListener("click", () => {
        YateId = doc.id;
        CrearYate.elements["NombreYate"].value =  data.NombreYate
        CrearYate.elements["Descripcion"].value = data.Descripcion
        CrearYate.elements["Bedrooms"].value = data.Bedrooms
        CrearYate.elements["Baths"].value = data.Baths
        CrearYate.elements["Food"].value = data.Food
        CrearYate.elements["Destino"].value = data.Destino
        CrearYate.elements["Actividad"].value = data.Actividad
        CrearYate.elements["Toys"].value = data.Toys
        CrearYate.elements["Precio2h"].value = data.Precio2h
        CrearYate.elements["Precio4h"].value = data.Precio4h
        CrearYate.elements["Precio6h"].value = data.Precio6h
        CrearYate.elements["Precio8h"].value = data.Precio8h
        CrearYate.elements["FuelIncluded"].value = data.FuelIncluded
        CrearYate.elements["Drinks"].value = data.Drinks
        CrearYate.elements["GuestIncluded"].value = data.GuestIncluded
        CrearYate.elements["MaxGuest"].value = data.MaxGuest
        CrearYate.elements["ExtraGuest"].value = data.ExtraGuest
        ButtonAgregarYate.innerText = "Actualizar";
        //   const PreviewPortadaCouch = document.getElementById('PreviewPortadaCouch');
        //   const PreviewImg = data.FotoCouch;
        //   PreviewPortadaCouch.src = PreviewImg;
      });
      const ButtonEliminarYate = document.createElement("div");
      ButtonEliminarYate.innerHTML = `<div class="button-min EliminarCard" style="  background-color: #a50005;">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
</div>`;
      ButtonEliminarYate.addEventListener("click", () => {
        db.collection("Yates")
          .doc(doc.id)
          .delete()
          .then(() => {})
          .catch((error) => {
            console.error("Error al eliminar el anuncio: ", error);
          });
      });
      MostrarYates.appendChild(ListaYates);
      ListaYates.appendChild(ButtonEditarYate);
      ListaYates.appendChild(ButtonEliminarYate);
    });
  });
}
