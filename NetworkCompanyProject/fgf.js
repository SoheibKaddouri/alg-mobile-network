document.addEventListener('DOMContentLoaded', () => {
  const basketButton = document.getElementById('basket-button');
  const basketMenu = document.getElementById('basket-menu');
  const closeButton = document.getElementById('close-button');
  const clearCartButton = document.querySelector('.clear-cart');

  if (!basketButton || !basketMenu || !closeButton || !clearCartButton) {
    console.error('Required basket elements not found');
    return;
  }

  let cachedCards = null;
  let basketState = getCurrentBasketItems();

  basketButton.addEventListener('click', () => {
    basketMenu.style.right = '0';
  });

  closeButton.addEventListener('click', () => {
    basketMenu.style.right = '-300px';
  });

  function getCachedCards() {
    if (!cachedCards) {
      cachedCards = Array.from(document.querySelectorAll('.card'));
    }
    return cachedCards;
  }

  function updateBasket(items) {
    const cards = getCachedCards();
    
    cards.forEach(card => {
      const quantitySpan = card.querySelector('.quantity');
      if (quantitySpan) {
        quantitySpan.textContent = '0';
      }
    });

    items.forEach(item => {
      cards.forEach(card => {
        const h2 = card.querySelector('h2');
        const serviceWrapper = card.closest('.service-wrapper');
        
        if (!h2 || !serviceWrapper) return;
        
        const planName = h2.textContent.trim();
        const h1 = serviceWrapper.querySelector('h1');
        
        if (!h1) return;
        
        const sectionTitle = h1.textContent.trim();
        const brand = getBrand(sectionTitle);

        if (item.name === planName && item.brand.toLowerCase() === brand.toLowerCase()) {
          const quantitySpan = card.querySelector('.quantity');
          if (quantitySpan) {
            quantitySpan.textContent = item.quantity;
          }
        }
      });
    });

    const basketContent = document.querySelector('.basket-content');
    if (!basketContent) return;
    
    basketContent.innerHTML = '';

    items.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('basket-item');
      const itemName = item.brand ? `${item.name} (${item.brand})` : item.name;
      itemDiv.innerHTML = `
        <span class="item-name">${itemName}</span>
        <span class="item-quantity">${item.quantity}</span>
        <button class="clear-item">Remove</button>
      `;
      basketContent.appendChild(itemDiv);

      const clearBtn = itemDiv.querySelector('.clear-item');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          removeFromCart(item);
        });
      }
    });
  }

  function addToCart(item) {
    const brand = item.brand ? item.brand.toLowerCase() : getBrandFromItem(item);
    if (!brand) return;
    
    const existingItem = basketState.find(i => 
      i.name === item.name && i.brand.toLowerCase() === brand.toLowerCase()
    );
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      basketState.push({ ...item, quantity: 1, brand: brand });
    }
    
    saveBasketState();
    updateBasket(basketState);
  }

  function removeFromCart(item) {
    const existingItem = basketState.find(i => 
      i.name === item.name && i.brand.toLowerCase() === item.brand.toLowerCase()
    );
    
    if (existingItem && existingItem.quantity > 0) {
      existingItem.quantity -= 1;
      if (existingItem.quantity === 0) {
        basketState = basketState.filter(i => 
          i.name !== item.name || i.brand.toLowerCase() !== item.brand.toLowerCase()
        );
      }
      saveBasketState();
      updateBasket(basketState);
    }
  }

  function clearCart() {
    basketState = [];
    StorageHelper.removeItem('cartItems');
    updateBasket([]);
  }

  document.addEventListener('click', event => {
    const plusButton = event.target.closest('.plus');
    const minusButton = event.target.closest('.minus');

    if (plusButton) {
      const card = plusButton.closest('.card');
      if (!card) return;
      
      const h2 = card.querySelector('h2');
      if (!h2) return;
      
      const planName = h2.textContent.trim();
      const brand = getBrandFromCard(card);
      if (brand) {
        addToCart({ name: planName, brand: brand });
      }
    }

    if (minusButton) {
      const card = minusButton.closest('.card');
      if (!card) return;
      
      const h2 = card.querySelector('h2');
      if (!h2) return;
      
      const planName = h2.textContent.trim();
      const brand = getBrandFromCard(card);
      if (brand) {
        removeFromCart({ name: planName, brand: brand });
      }
    }
  });

  clearCartButton.addEventListener('click', () => {
    clearCart();
  });

  function getBrand(sectionTitle) {
    const lower = sectionTitle.toLowerCase();
    if (lower.includes("gap")) return "gap";
    if (lower.includes("fone")) return "fone";
    if (lower.includes("flipper")) return "flipper";
    return "";
  }

  function getBrandFromItem(item) {
    const lower = item.name.toLowerCase();
    if (lower.includes("gap")) return "gap";
    if (lower.includes("fone")) return "fone";
    if (lower.includes("flipper")) return "flipper";
    return "";
  }

  function getBrandFromCard(card) {
    const serviceWrapper = card.closest('.service-wrapper');
    if (!serviceWrapper) return "";
    
    const h1 = serviceWrapper.querySelector('h1');
    if (!h1) return "";
    
    const sectionTitle = h1.textContent.trim();
    return getBrand(sectionTitle);
  }

  function getCurrentBasketItems() {
    return StorageHelper.getParsed('cartItems', []);
  }

  function saveBasketState() {
    StorageHelper.setStringified('cartItems', basketState);
  }

  function loadCartItems() {
    basketState = getCurrentBasketItems();
    updateBasket(basketState);
  }

  loadCartItems();
});
