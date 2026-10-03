// ================================
// SOFIE BAKEHOUSE
// JavaScript - Cart & WhatsApp
// ================================

// Nomor WhatsApp Sofiani
const WHATSAPP_NUMBER = "6289513409625";

let cart = [];


// ================================
// FORMAT HARGA
// ================================

function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number);
}


// ================================
// TAMBAH PRODUK KE KERANJANG
// ================================

function addToCart(name, price) {

  const existingItem = cart.find(function(item) {
    return item.name === name;
  });

  if (existingItem) {

    existingItem.qty = existingItem.qty + 1;

  } else {

    cart.push({
      name: name,
      price: price,
      qty: 1
    });

  }

  renderCart();
  openCart();
}


// ================================
// UBAH JUMLAH PRODUK
// ================================

function changeQty(name, amount) {

  const item = cart.find(function(item) {
    return item.name === name;
  });

  if (!item) {
    return;
  }

  item.qty = item.qty + amount;

  // Kalau jumlah menjadi 0, hapus dari keranjang
  if (item.qty <= 0) {

    cart = cart.filter(function(item) {
      return item.name !== name;
    });

  }

  renderCart();
}


// ================================
// MENAMPILKAN KERANJANG
// ================================

function renderCart() {

  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  const cartTotal = document.getElementById("cartTotal");


  // Hitung jumlah semua barang
  const totalItems = cart.reduce(function(total, item) {
    return total + item.qty;
  }, 0);


  // Hitung total harga
  const totalPrice = cart.reduce(function(total, item) {
    return total + (item.price * item.qty);
  }, 0);


  // Update angka keranjang
  cartCount.textContent = totalItems;


  // Update total harga
  cartTotal.textContent = formatRupiah(totalPrice);


  // Kalau keranjang kosong
  if (cart.length === 0) {

    cartItems.innerHTML = `
      <div class="empty-cart">
        Keranjang masih kosong ♡<br>
        Pilih menu yang kamu suka dulu ya!
      </div>
    `;

    return;
  }


  // Kalau ada barang
  cartItems.innerHTML = cart.map(function(item) {

    return `
      <div class="cart-item">

        <div class="cart-item-info">
          <b>${item.name}</b>
          <span>${formatRupiah(item.price)} / item</span>
        </div>

        <div class="qty">

          <button onclick="changeQty('${item.name}', -1)">
            −
          </button>

          <b>${item.qty}</b>

          <button onclick="changeQty('${item.name}', 1)">
            +
          </button>

        </div>

      </div>
    `;

  }).join("");
}


// ================================
// BUKA KERANJANG
// ================================

function openCart() {

  const cartOverlay = document.getElementById("cartOverlay");

  cartOverlay.style.display = "block";

  document.body.style.overflow = "hidden";

  renderCart();
}


// ================================
// TUTUP KERANJANG
// ================================

function closeCart() {

  const cartOverlay = document.getElementById("cartOverlay");

  cartOverlay.style.display = "none";

  document.body.style.overflow = "";
}


// ================================
// TUTUP KALAU KLIK DI LUAR CART
// ================================

function closeCartOutside(event) {

  if (event.target.id === "cartOverlay") {

    closeCart();

  }
}


// ================================
// CHECKOUT KE WHATSAPP
// ================================

function checkoutWhatsApp() {

  // Kalau keranjang kosong
  if (cart.length === 0) {

    alert("Keranjang masih kosong ♡");

    return;
  }


  // Membuat daftar pesanan
  const orderList = cart.map(function(item) {

    const subtotal = item.price * item.qty;

    return (
      "• " +
      item.name +
      " x" +
      item.qty +
      " = " +
      formatRupiah(subtotal)
    );

  });


  // Menghitung total
  const total = cart.reduce(function(sum, item) {

    return sum + (item.price * item.qty);

  }, 0);


  // Isi pesan WhatsApp
  const message =
    "Hi Sofie Bakehouse! ♡ Aku mau pesan:\n" +
    orderList.join("\n") +
    "\n\nTotal: " +
    formatRupiah(total) +
    "\n\nBoleh info ketersediaan dan detail pesanannya?";


  // Membuat link WhatsApp
  const whatsappURL =
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(message);


  // Buka WhatsApp
  window.open(whatsappURL, "_blank");
}


// ================================
// TOMBOL ESC UNTUK TUTUP CART
// ================================

document.addEventListener("keydown", function(event) {

  if (event.key === "Escape") {

    closeCart();

  }

});


// ================================
// JALANKAN SAAT WEBSITE DIBUKA
// ================================

renderCart();
