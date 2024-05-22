document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
  
    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  
    function createPartition(parent, direction) {
      const partition1 = document.createElement('div');
      const partition2 = document.createElement('div');
      partition1.className = 'partition resizable';
      partition2.className = 'partition resizable';
      partition1.style.backgroundColor = parent.style.backgroundColor || getRandomColor();
      partition2.style.backgroundColor = getRandomColor();
  
      const controls1 = document.createElement('div');
      controls1.className = 'controls';
      const controls2 = document.createElement('div');
      controls2.className = 'controls';
  
      ['V', 'H'].forEach(type => {
        const button1 = document.createElement('button');
        const button2 = document.createElement('button');
        button1.textContent = type;
        button2.textContent = type;
        button1.className = `split-${type.toLowerCase()}`;
        button2.className = `split-${type.toLowerCase()}`;
        button1.addEventListener('click', () => createPartition(partition1, type));
        button2.addEventListener('click', () => createPartition(partition2, type));
        controls1.appendChild(button1);
        controls2.appendChild(button2);
      });
  
      const removeButton1 = document.createElement('button');
      const removeButton2 = document.createElement('button');
      removeButton1.textContent = '-';
      removeButton2.textContent = '-';
      removeButton1.className = 'remove';
      removeButton2.className = 'remove';
      removeButton1.addEventListener('click', () => partition1.remove());
      removeButton2.addEventListener('click', () => partition2.remove());
  
      partition1.appendChild(controls1);
      partition1.appendChild(removeButton1);
      partition2.appendChild(controls2);
      partition2.appendChild(removeButton2);
  
      if (direction === 'H') {
        parent.style.display = 'flex';
        parent.style.flexDirection = 'row';
        partition1.style.width = '50%';
        partition1.style.height = '100%';
        partition2.style.width = '50%';
        partition2.style.height = '100%';
      } else {
        parent.style.display = 'flex';
        parent.style.flexDirection = 'column';
        partition1.style.width = '100%';
        partition1.style.height = '50%';
        partition2.style.width = '100%';
        partition2.style.height = '50%';
      }
  
      parent.innerHTML = '';
      parent.appendChild(partition1);
      parent.appendChild(partition2);
    }
  
    container.querySelector('.split-v').addEventListener('click', () => createPartition(container, 'V'));
    container.querySelector('.split-h').addEventListener('click', () => createPartition(container, 'H'));
  });
  