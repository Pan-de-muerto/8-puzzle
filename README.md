
# Cuadro magico 

Implementacion del famoso juego cuadro magico, tambien conocido como slide-puzzle o 8-puzzle.

🚀 Utiliza el algoritmo A* con heuristica de "fichas desordenadas"

**Ejemplo desplegado**
https://splendid-cucurucho-4392e3.netlify.app/

# Reglas

![Tux, the Linux mascot](https://m.media-amazon.com/images/I/41eTWzx9DWL._AC_SX425_.jpg)


Una pieza solo puede moverse al espacio vacío,
Por ejemplo:
El 15 solo puede moverse a la derecha
El 12 solo puede moverse hacia abajo

Si el 12 se moviera hacia abajo, entonces:

El 11 solo puede moverse a la derecha
El 8 solo puede moverse hacia abajo
El 12 Solo puede moverse hacia arriba

# Como jugar

- Has click en una ficha para moverla al espacio libre mas cercano.
- Ordena las fichas por orden numerio y deja el espacio vacio al final. 

**SHUFFLE:**
  Cambia el orden de las piezas aleatoreamente.

**UPLOAD:**
  Sube un archivo de texto (.txt) que contenga el orden de las fichas.
  ej:
      1, 3, 6
      2, 5, 8
      4, 7
      
**SOLVE:**
  Resolver automaticamente el juego a partir del estado actual.
