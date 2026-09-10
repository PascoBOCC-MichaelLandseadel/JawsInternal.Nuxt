<template>
  <div />
</template>
<script setup>
import Swal from 'sweetalert2'

async function showSweetAlert(title, text, confirmButtonText, showCancelButton) {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText
  })
  return result.isConfirmed
}

async function showSweetAlertWithCheckbox(title, text, confirmButtonText, showCancelButton) {
  const result = await Swal.fire({
    title,
    input: 'checkbox',
    inputPlaceholder: 'Yes',
    inputValidator: (value) => {
      if (!value) {
        return 'You need check "Yes"';
      }},
    html: '<b>This action is final!</b> <br> <br> ' +
        '<span>' + text + ' </span>'+
        'Are you certain you would like to continue?',
    icon: 'warning',
    showCancelButton,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: "<span style='color:white;font-family: Roboto, sans-serif'>" + confirmButtonText + "</span>",
    cancelButtonText: "<span style='color:white;font-family: Roboto, sans-serif'>Cancel</span>",
  })
  return result.isConfirmed
}

async function showSweetAlertWithTextbox() {
  const result = await Swal.fire({
    title: 'Input something',
    input: 'textarea'
  })
  return result.value
}

defineExpose({
  showSweetAlert,
  showSweetAlertWithCheckbox,
  showSweetAlertWithTextbox
})
</script>
