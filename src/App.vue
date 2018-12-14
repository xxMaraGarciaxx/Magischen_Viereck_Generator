<template>
  <div id="app">
    <div>
      Bitte geben Sie die Länge des Quadrats ein:
      <input v-model.number="n" type="number" />
    </div>
    <table>
      <tr v-for="(row, index) in currentArray" :key="index">
        <td v-for="(cell, index) in row" :key="index">
          <span v-if="!cell"> &nbsp;&nbsp; </span>
          <transition name="fade">
            <span v-if="cell"> {{ cell }} </span>
          </transition>
        </td>
      </tr>
    </table>

    <span>Die magische Zahl lautet {{ magicNumber }} </span>
  </div>
</template>

<script lang="ts">
import { magicSquare, createArray } from "./magicSquare";

export default {
  name: "App",
  data() {
    return {
      currentArray: createArray(3),
      n: 3,
      interval: null
    };
  },
  computed: {
    magicNumber() {
      return (this.n * (this.n ** 2 + 1)) / 2;
    }
  },
  watch: {
    n: {
      handler(value) {
        clearInterval(this.interval);
        this.$set(this, "currentArray", createArray(value));
        const newArray = magicSquare(value);
        let indexMap = new Array(value ** 2).fill();
        for (let y = 0; y < value; y++) {
          for (let x = 0; x < value; x++) {
            indexMap[newArray[y][x] - 1] = [x, y];
          }
        }
        let steps = [];
        let n = value;
        for (const [index, [x, y]] of indexMap.entries()) {
          steps.push(() => {
            if (this.n === n) {
              this.$set(this.currentArray[y], x, index + 1);
            }
          });
        }
        let stepIndex = 0;
        setInterval(() => {
          if(steps[stepIndex]){

          steps[stepIndex++]();
        
          }
            if (stepIndex === steps.length) {
            clearInterval(this.interval);
          }
        }, 50);
      },
      immediate: true
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: grid;
  place-items: center;
}

table {
  border-collapse: collapse;
}

td {
  border: 2px solid black;
  width: 2rem;
  height: 2rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

input {
  margin-top: 10rem;
  margin-bottom: 10px;
  border: 2px solid black;
  border-radius: 5px;
  width: 30px;
}

span {
  margin-top: 20px;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
