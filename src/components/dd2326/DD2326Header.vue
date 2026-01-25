<template>
  <div class="form-header">
    <table>
      <tbody>
        <tr>
          <td class="approval-stamp">
            <div class="stamp-label">APPROVAL STAMP</div>
          </td>
          <td class="title-section">
            <h1>PRESERVATION AND PACKING DATA</h1>
            <p class="omb-notice">
              The public reporting burden for this collection of information is estimated to average 110 hours per response, including the time for reviewing instructions,
              searching existing data sources, gathering and maintaining the data needed, and completing and reviewing the collection of information. Send comments
              regarding this burden estimate or any other aspect of this collection of information, including suggestions for reducing the burden, to the Department of Defense,
              Executive Services Directorate (0704-0188). Respondents should be aware that notwithstanding any other provision of law, no person shall be subject to
              any penalty for failing to comply with a collection of information if it does not display a currently valid OMB control number.
            </p>
            <p class="please-note"><strong>PLEASE DO NOT RETURN YOUR FORM TO THE ABOVE ORGANIZATION.</strong></p>
          </td>
          <td class="omb-info">
            <div><strong>Form Approved</strong></div>
            <div><strong>OMB No. 0704-0188</strong></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
</script>

<style scoped>
.form-header {
  border-bottom: 2px solid black;
}

.form-header table {
  width: 100%;
  border-collapse: collapse;
}

.form-header td {
  border: 1px solid black;
  padding: 8px;
  vertical-align: top;
}

.approval-stamp {
  width: 15%;
  text-align: center;
  vertical-align: middle;
}

.stamp-label {
  font-weight: bold;
  font-size: 11px;
  writing-mode: horizontal-tb;
}

.title-section {
  width: 60%;
  text-align: center;
}

.title-section h1 {
  font-size: 14px;
  font-weight: bold;
  margin: 0 0 8px 0;
  letter-spacing: 0.5px;
}

.omb-notice {
  font-size: 7px;
  text-align: left;
  line-height: 1.4;
  margin: 0 0 4px 0;
}

.please-note {
  font-size: 8px;
  text-align: center;
  margin: 4px 0 0 0;
}

.omb-info {
  width: 25%;
  text-align: center;
  font-size: 10px;
  vertical-align: middle;
}

.omb-info div {
  margin: 4px 0;
}
</style>
