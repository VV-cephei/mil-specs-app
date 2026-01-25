<template>
  <div class="form-footer">
    <table>
      <tbody>
        <tr>
          <td class="form-number">DD FORM 2326, SEP 1997</td>
          <td class="obsolete-notice">PREVIOUS EDITIONS ARE OBSOLETE.</td>
          <td class="reset-button">
            <button @click="$emit('reset')" type="button">Reset</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineEmits(['reset'])
</script>

<style scoped>
.form-footer {
  border-top: 2px solid black;
}

.form-footer table {
  width: 100%;
  border-collapse: collapse;
}

.form-footer td {
  padding: 8px;
  font-size: 10px;
  border: none;
}

.form-number {
  font-weight: bold;
  width: 30%;
  text-align: left;
}

.obsolete-notice {
  text-align: center;
  width: 50%;
}

.reset-button {
  text-align: right;
  width: 20%;
}

.reset-button button {
  padding: 4px 16px;
  border: 1px solid black;
  background: white;
  cursor: pointer;
  font-size: 10px;
  font-weight: bold;
}

.reset-button button:hover {
  background: #f0f0f0;
}

.reset-button button:active {
  background: #e0e0e0;
}
</style>
