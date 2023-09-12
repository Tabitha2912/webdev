<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", function () {
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      var produkContainer = document.getElementById("produk-container");

      data.produk.forEach(produk => {
        var card = createProductCard(produk);
        produkContainer.appendChild(card);

        var plusButton = card.querySelector(".plus-btn");
        var minusButton = card.querySelector(".minus-btn");
        var quantityInput = card.querySelector(".quantity-input");
        var addToCartButton = card.querySelector(".add-to-cart-btn");

        
        plusButton.addEventListener("click", function () { increaseQuantity(quantityInput); });
        minusButton.addEventListener("click", function () { decreaseQuantity(quantityInput); });
        addToCartButton.addEventListener("click", function () {
          var quantity = parseInt(quantityInput.value);
          if (quantity > 0) {
            addToCart(produk, quantity);
            updateCartUI(); // Memanggil fungsi untuk memperbarui tampilan keranjang
            quantityInput.value = "1"; // Reset kuantitas ke 1 setelah ditambahkan ke keranjang
          }
        });
        document.getElementById("show-total-button").addEventListener("click", function () {
          var totalBayar = calculateTotalBayar();
          displayTotalBayar(totalBayar);
        });
        document.getElementById('page-down-button').addEventListener('click', function() {
          window.scrollBy(0, window.innerHeight);
        });
        
      });
    })
    .catch(error => console.error("Error fetching data:", error));
});


// Fungsi untuk menggulir halaman ke bawah
function pageDown() {
  window.scrollBy(0, window.innerHeight);
}

function createProductCard(produk) {
  var card = document.createElement("div");
  card.classList.add("col-md-3", "mb-4");

  card.innerHTML = `
    <div class="card">
      <div class="d-flex justify-content-center align-items-center" style="height: 270px;">
        <img src="Assets/${produk.gambar}" class="card-img-top" alt="${produk.nama}">
      </div>
      <div class="card-body text-center">
        <h5 class="card-title">${produk.nama}</h5>
        <p class="card-text">${produk.deskripsi}</p>
        <p class="card-text">Rp. ${produk.harga}</p>
        <div class="row">
          <div class="col-md-4"><button class="btn btn-outline-primary minus-btn">-</button></div>
          <div class="col-md-4"><input type="number" class="form-control quantity-input align-center" value="1"></div>
          <div class="col-md-4"><button class="btn btn-outline-primary plus-btn">+</button></div>
        </div>
        <div class="row mt-3">
          <div class="col-md-1"></div>
          <button class="col-md-9 btn btn-success add-to-cart-btn">Add to Cart</button>
          <div class="col-md-1"></div>
        </div>
      </div>
    </div>
  `;

  return card;
}

function increaseQuantity(input) {
  input.value = parseInt(input.value) + 1;
}

function decreaseQuantity(input) {
  if (parseInt(input.value) > 1) {
    input.value = parseInt(input.value) - 1;
  }
}

var cart = []; // Deklarasi dan inisialisasi variabel cart di luar fungsi

function addToCart(produk, quantity) {
  // Cari apakah produk sudah ada di keranjang
  var existingProduct = cart.find(item => item.produk.nama === produk.nama);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({ produk, quantity });
  }

  updateCartUI();
}

function updateCartUI() {
  var cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = ""; // Bersihkan tampilan keranjang sebelum diperbarui

  var totalHarga = 0;
  var totalPajak = 0; // Inisialisasi total pajak

  cart.forEach(item => {
    const productName = item.produk.nama; // Mengambil nama produk dari item
    const gambar = item.produk.gambar; 
    const quantity = item.quantity; // Mengambil kuantitas produk dari item
    const productPrice = parseInt(item.produk.harga); // Mengambil harga produk dalam format angka
    totalHarga += productPrice * quantity;

    // Menghitung subtotal (tanpa pajak)
    var subtotal = productPrice * quantity;

    // Menghitung pajak sebesar 11%
    var pajak = 0.11 * subtotal;
    totalPajak += pajak;

    var cartItem = document.createElement("div");
    cartItem.classList.add("mb-1", "p-3", "border", "col-md-12", "ml-3");
    cartItem.innerHTML = `
    <div class="cart-item align-items-center">
      <div class="row">
          <div class="col-md-4">
              <div class="d-flex align-items-center">
                  <img src="Assets/${gambar}" style="height: 50px; width: auto;" class="card-img-top" alt="${productName}">
              </div>
          </div>
          <div class="col-md-4">
              <h6 class="mb-0">${productName}</h6>
              <p class="mb-0">x${quantity} pcs</p>
          </div>
          <div class="col-md-4">
              <p class="mb-0">Rp. ${productPrice.toLocaleString()}</p>
              <p class="mb-0">Subtotal: Rp. ${(subtotal).toLocaleString()}</p>
          </div>
      </div>
  </div>

  `;

    cartContainer.appendChild(cartItem);
  });

  // Menggunakan innerHTML untuk menambahkan elemen-elemen ke dalam cartContainer
  cartContainer.innerHTML += `
  <p class="font-weight-bold align-right">Total Pembelian: Rp. ${totalHarga.toLocaleString()}</p>
  <br>
  <p class="font-weight-bold align-right">Pajak (11%): Rp. ${totalPajak.toLocaleString()}</p>
  `;

  var totalBayar = totalHarga + totalPajak;

  cartContainer.innerHTML += `
  <p class="font-weight-bold align-right">Total Bayar: Rp. ${totalBayar.toLocaleString()}</p>
  `;

}


// Fungsi untuk mengonversi format harga string ke numerik
function parsePrice(priceString) {
  if (typeof priceString === "string") {
      const numericString = priceString.replace(/[^\d]/g, "");
      const numericPrice = parseInt(numericString, 10);
      return numericPrice;
  }
  return 0; // Nilai default jika priceString bukan string
}


// Fungsi untuk menghitung total bayar
function calculateTotalBayar() {
  var totalHarga = 0;
  var totalPajak = 0;

  cart.forEach(item => {
      const productPrice = parsePrice(item.produk.harga);
      totalHarga += productPrice * item.quantity;
      totalPajak += 0.11 * (productPrice * item.quantity);
  });

  return totalHarga + totalPajak;
}

// Fungsi untuk menampilkan total bayar dalam modal
function displayTotalBayar(totalBayar) {
  var totalBayarModal = document.getElementById("totalBayarModal");
  totalBayarModal.style.display = "block"; // Menampilkan modal

  // Atur modal menjadi terlihat
  totalBayarModal.classList.add("show");
  totalBayarModal.style.display = "block";
  totalBayarModal.setAttribute("aria-modal", "true");

  // Buat backdrop modal terlihat
  var modalBackdrop = document.createElement("div");
  modalBackdrop.classList.add("modal-backdrop", "fade", "show");
  document.body.appendChild(modalBackdrop);

  // Dapatkan elemen ul untuk daftar produk
  var produkList = document.getElementById("produkList");
  produkList.innerHTML = ""; // Bersihkan daftar produk sebelum mengisi ulang

  // Loop melalui keranjang dan menambahkan detail produk ke daftar
  cart.forEach(item => {
    const productName = item.produk.nama;
    const productPrice = parseInt(item.produk.harga);
    const quantity = item.quantity;

    // Membuat elemen li untuk setiap produk
    var productItem = document.createElement("li");
    productItem.classList.add("list-group-item");
    productItem.textContent = `${productName} x ${quantity} - Rp. ${productPrice.toLocaleString()}`;
    
    produkList.appendChild(productItem);
  });

}

=======
document.addEventListener("DOMContentLoaded", function () {
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      var produkContainer = document.getElementById("produk-container");

      data.produk.forEach(produk => {
        var card = createProductCard(produk);
        produkContainer.appendChild(card);

        var plusButton = card.querySelector(".plus-btn");
        var minusButton = card.querySelector(".minus-btn");
        var quantityInput = card.querySelector(".quantity-input");
        var addToCartButton = card.querySelector(".add-to-cart-btn");

        
        plusButton.addEventListener("click", function () { increaseQuantity(quantityInput); });
        minusButton.addEventListener("click", function () { decreaseQuantity(quantityInput); });
        addToCartButton.addEventListener("click", function () {
          var quantity = parseInt(quantityInput.value);
          if (quantity > 0) {
            addToCart(produk, quantity);
            updateCartUI(); // Memanggil fungsi untuk memperbarui tampilan keranjang
            quantityInput.value = "1"; // Reset kuantitas ke 1 setelah ditambahkan ke keranjang
          }
        });
        document.getElementById("show-total-button").addEventListener("click", function () {
          var totalBayar = calculateTotalBayar();
          displayTotalBayar(totalBayar);
        });
        document.getElementById('page-down-button').addEventListener('click', function() {
          window.scrollBy(0, window.innerHeight);
        });
        
      });
    })
    .catch(error => console.error("Error fetching data:", error));
});


// Fungsi untuk menggulir halaman ke bawah
function pageDown() {
  window.scrollBy(0, window.innerHeight);
}

function createProductCard(produk) {
  var card = document.createElement("div");
  card.classList.add("col-md-3", "mb-4");

  card.innerHTML = `
    <div class="card">
      <div class="d-flex justify-content-center align-items-center" style="height: 270px;">
        <img src="Assets/${produk.gambar}" class="card-img-top" alt="${produk.nama}">
      </div>
      <div class="card-body text-center">
        <h5 class="card-title">${produk.nama}</h5>
        <p class="card-text">${produk.deskripsi}</p>
        <p class="card-text">Rp. ${produk.harga}</p>
        <div class="row">
          <div class="col-md-4"><button class="btn btn-outline-primary minus-btn">-</button></div>
          <div class="col-md-4"><input type="number" class="form-control quantity-input align-center" value="1"></div>
          <div class="col-md-4"><button class="btn btn-outline-primary plus-btn">+</button></div>
        </div>
        <div class="row mt-3">
          <div class="col-md-1"></div>
          <button class="col-md-9 btn btn-success add-to-cart-btn">Add to Cart</button>
          <div class="col-md-1"></div>
        </div>
      </div>
    </div>
  `;

  return card;
}

function increaseQuantity(input) {
  input.value = parseInt(input.value) + 1;
}

function decreaseQuantity(input) {
  if (parseInt(input.value) > 1) {
    input.value = parseInt(input.value) - 1;
  }
}

var cart = []; // Deklarasi dan inisialisasi variabel cart di luar fungsi

function addToCart(produk, quantity) {
  // Cari apakah produk sudah ada di keranjang
  var existingProduct = cart.find(item => item.produk.nama === produk.nama);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({ produk, quantity });
  }

  updateCartUI();
}

function updateCartUI() {
  var cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = ""; // Bersihkan tampilan keranjang sebelum diperbarui

  var totalHarga = 0;
  var totalPajak = 0; // Inisialisasi total pajak

  cart.forEach(item => {
    const productName = item.produk.nama; // Mengambil nama produk dari item
    const gambar = item.produk.gambar; 
    const quantity = item.quantity; // Mengambil kuantitas produk dari item
    const productPrice = parseInt(item.produk.harga); // Mengambil harga produk dalam format angka
    totalHarga += productPrice * quantity;

    // Menghitung subtotal (tanpa pajak)
    var subtotal = productPrice * quantity;

    // Menghitung pajak sebesar 11%
    var pajak = 0.11 * subtotal;
    totalPajak += pajak;

    var cartItem = document.createElement("div");
    cartItem.classList.add("mb-1", "p-3", "border", "col-md-12", "ml-3");
    cartItem.innerHTML = `
    <div class="cart-item align-items-center">
      <div class="row">
          <div class="col-md-4">
              <div class="d-flex align-items-center">
                  <img src="Assets/${gambar}" style="height: 50px; width: auto;" class="card-img-top" alt="${productName}">
              </div>
          </div>
          <div class="col-md-4">
              <h6 class="mb-0">${productName}</h6>
              <p class="mb-0">x${quantity} pcs</p>
          </div>
          <div class="col-md-4">
              <p class="mb-0">Rp. ${productPrice.toLocaleString()}</p>
              <p class="mb-0">Subtotal: Rp. ${(subtotal).toLocaleString()}</p>
          </div>
      </div>
  </div>

  `;

    cartContainer.appendChild(cartItem);
  });

  // Menggunakan innerHTML untuk menambahkan elemen-elemen ke dalam cartContainer
  cartContainer.innerHTML += `
  <p class="font-weight-bold align-right">Total Pembelian: Rp. ${totalHarga.toLocaleString()}</p>
  <br>
  <p class="font-weight-bold align-right">Pajak (11%): Rp. ${totalPajak.toLocaleString()}</p>
  `;

  var totalBayar = totalHarga + totalPajak;

  cartContainer.innerHTML += `
  <p class="font-weight-bold align-right">Total Bayar: Rp. ${totalBayar.toLocaleString()}</p>
  `;

}


// Fungsi untuk mengonversi format harga string ke numerik
function parsePrice(priceString) {
  if (typeof priceString === "string") {
      const numericString = priceString.replace(/[^\d]/g, "");
      const numericPrice = parseInt(numericString, 10);
      return numericPrice;
  }
  return 0; // Nilai default jika priceString bukan string
}


// Fungsi untuk menghitung total bayar
function calculateTotalBayar() {
  var totalHarga = 0;
  var totalPajak = 0;

  cart.forEach(item => {
      const productPrice = parsePrice(item.produk.harga);
      totalHarga += productPrice * item.quantity;
      totalPajak += 0.11 * (productPrice * item.quantity);
  });

  return totalHarga + totalPajak;
}

// Fungsi untuk menampilkan total bayar dalam modal
function displayTotalBayar(totalBayar) {
  var totalBayarModal = document.getElementById("totalBayarModal");
  totalBayarModal.style.display = "block"; // Menampilkan modal

  // Atur modal menjadi terlihat
  totalBayarModal.classList.add("show");
  totalBayarModal.style.display = "block";
  totalBayarModal.setAttribute("aria-modal", "true");

  // Buat backdrop modal terlihat
  var modalBackdrop = document.createElement("div");
  modalBackdrop.classList.add("modal-backdrop", "fade", "show");
  document.body.appendChild(modalBackdrop);

  // Dapatkan elemen ul untuk daftar produk
  var produkList = document.getElementById("produkList");
  produkList.innerHTML = ""; // Bersihkan daftar produk sebelum mengisi ulang

  // Loop melalui keranjang dan menambahkan detail produk ke daftar
  cart.forEach(item => {
    const productName = item.produk.nama;
    const productPrice = parseInt(item.produk.harga);
    const quantity = item.quantity;

    // Membuat elemen li untuk setiap produk
    var productItem = document.createElement("li");
    productItem.classList.add("list-group-item");
    productItem.textContent = `${productName} x ${quantity} - Rp. ${productPrice.toLocaleString()}`;
    
    produkList.appendChild(productItem);
  });

}

>>>>>>> 285d17b85c951296e3773531466df99650460303
