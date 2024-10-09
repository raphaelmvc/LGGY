document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    const boxes = document.querySelectorAll(".about-box");
    const totalBoxes = boxes.length;

    function showBox(index) {
        // Remove a classe 'active' de todas as caixas
        boxes.forEach(box => box.classList.remove("active"));
        // Adiciona a classe 'active' somente à caixa atual
        boxes[index].classList.add("active");
    }

    // Exibir a primeira caixa inicialmente
    showBox(currentIndex);

    // Função para alternar para a próxima caixa a cada 5 segundos
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalBoxes;
        showBox(currentIndex);
    }, 5000); // 5000 milissegundos = 5 segundos
});
