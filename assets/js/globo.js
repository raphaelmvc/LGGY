document.addEventListener("DOMContentLoaded", () => {
  const textBlocks = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2"),
    text3: document.getElementById("text3"),
    text4: document.getElementById("text4"),
    text5: document.getElementById("text5"),
    text6: document.getElementById("text6"),
  };

  const svgContainer = document.getElementById("map-container");

  const contentData = {
    btn1: {
      svgPath: "/img/SA.svg",
      text1: { value: 61, suffix: "" },
      text2: "Influencers",
      text3: { value: 20, suffix: "M+" },
      text4: "Local Reach",
      text5: { value: 9.7, suffix: "%" },
      text6: "Engagement Rate",
      highlight: ['brazil', 'argentina'] // IDs dos países para destacar
    },
    btn2: {
      svgPath: "/img/NA.svg",
      text1: { value: 47, suffix: "" },
      text2: "Influencers",
      text3: { value: 9, suffix: "M+" },
      text4: "Local Reach",
      text5: { value: 8.5, suffix: "%" },
      text6: "Engagement Rate",
      highlight: ['usa', 'canada']
    },

    btn3: {
      svgPath: "/img/Europa.svg",
      text1: { value: 42, suffix: "" },
      text2: "Influencers",
      text3: { value: 4, suffix: "M+" },
      text4: "Local Reach",
      text5: { value: 8.8, suffix: "%" },
      text6: "Engagement Rate",
      highlight: ['reinounido', 'germany','france', 'netherlands','spain', 'portugal']
    },
    btn4: {
      svgPath: "/img/Asia.svg",
      text1: { value: 173, suffix: "" },
      text2: "Influencers",
      text3: { value: 30, suffix: "M+" },
      text4: "Local Reach",
      text5: { value: 8.3, suffix: "%" },
      text6: "Engagement Rate",
      highlight: ['china', 'japan','korea']
    },
    btn5: {
      svgPath: "/img/oceania.svg",
      text1: { value: 15, suffix: "" },
      text2: "Influencers",
      text3: { value: 1.5, suffix: "M+" },
      text4: "Local Reach",
      text5: { value: 8.6, suffix: "%" },
      text6: "Engagement Rate",
      highlight: ['australia']
    },

    // Adicione dados para outros botões conforme necessário
  };

  function animateCounter(element, startValue, endValue, duration, suffix = '') {
    let startTime = null;
  
    function updateCounter(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentValue = progress * (endValue - startValue) + startValue;
  
      // Determinar o valor a ser exibido
      let displayedValue;
      if (progress < 1) {
        // Durante a animação, exibir um inteiro ou uma casa decimal
        displayedValue = Number.isInteger(currentValue) 
          ? Math.floor(currentValue) 
          : currentValue.toFixed(1);
      } else {
        // Ao final, formatar corretamente
        displayedValue = Number.isInteger(endValue) 
          ? Math.floor(endValue) 
          : endValue.toFixed(1);
      }
  
      element.textContent = `${displayedValue}${suffix}`;
  
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }
  
    requestAnimationFrame(updateCounter);
  }

  function loadSVG(url, highlightCountries) {
    fetch(url)
      .then(response => response.text())
      .then(svg => {
        svgContainer.innerHTML = svg;
        styleSVG(highlightCountries);
      })
      .catch(error => {
        console.error('Error loading SVG:', error);
      });
  }

  function styleSVG(highlightCountries) {
    const countries = svgContainer.querySelectorAll("path");
    countries.forEach(country => {
      if (highlightCountries.includes(country.id)) {
        country.style.transition = "fill 0.3s";
        country.style.fill = "var(--text)"; // Cor padrão para países destacados
        
        // Adicionar evento para mouseover e mouseout
        country.addEventListener("mouseover", () => {
          // Mudar a cor de todos os caminhos com o mesmo id
          countries.forEach(c => {
            if (c.id === country.id) {
              c.style.fill = "var(--purple)"; // Cor de destaque
            }
          });
        });
        country.addEventListener("mouseout", () => {
          // Voltar a cor de todos os caminhos com o mesmo id
          countries.forEach(c => {
            if (c.id === country.id) {
              c.style.fill = "var(--text)"; // Cor padrão
            }
          });
        });
      } else {
        country.style.fill = "var(--text)"; // Cor padrão para países não destacados
      }
    });
  }
  

  function updateContent(buttonId) {
    const data = contentData[buttonId];
    if (data) {
      loadSVG(data.svgPath, data.highlight);
  
      // Reset text blocks to start from 0
      textBlocks["text1"].textContent = "+0k";
      textBlocks["text3"].textContent = "+0k";
      textBlocks["text5"].textContent = "+0k";
  
      // Animate counters to the new values, passando o sufixo adequado
      animateCounter(textBlocks["text1"], 0, data.text1.value, 2000, data.text1.suffix);
      textBlocks["text2"].textContent = data.text2;
      animateCounter(textBlocks["text3"], 0, data.text3.value, 2000, data.text3.suffix);
      textBlocks["text4"].textContent = data.text4;
      animateCounter(textBlocks["text5"], 0, data.text5.value, 2000, data.text5.suffix);
      textBlocks["text6"].textContent = data.text6;
    }
  }
  

  function updateActiveButton(buttonId) {
    document.querySelectorAll(".button_container .btn").forEach((button) => {
      button.classList.toggle("active", button.id === buttonId);
    });
  }

  const initialButtonId = "btn1";
  updateContent(initialButtonId);
  updateActiveButton(initialButtonId);

  document.querySelectorAll(".button_container .btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.id;
      updateContent(id);
      updateActiveButton(id);
    });
  });
});
