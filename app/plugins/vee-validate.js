// plugins/vee-validate.js
import { defineRule, configure } from 'vee-validate'
import { required, email, confirmed } from '@vee-validate/rules'

export default defineNuxtPlugin(() => {
    // Basic rules
    defineRule('required', required)
    defineRule('email', email)
    defineRule('confirmed', confirmed)

    // Custom rules
    defineRule('min', (value, [length]) => {
        if (!value || typeof value !== 'string') return false
        return value.length >= Number(length)
    })

    defineRule('isChecked', (value, [cbValue]) => {
        return cbValue === 'true' ? (value || '').trim().length > 0 : true
    })

    defineRule('isNotChecked', (value, [cbValue]) => {
        return cbValue === 'false' ? (value || '').trim().length > 0 : false
    })

    defineRule('passwordComplexity', value => {
        return /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(value)
    })

    // Optional: set custom messages
    configure({
        generateMessage: ctx => {
            const messages = {
                required: `${ctx.field} is required`,
                min: `${ctx.field} must be at least ${ctx.rule.params[0]} characters long`,
                email: 'Email must be valid',
                confirmed: `${ctx.field} does not match`,
                isChecked: `${ctx.field} is required`,
                isNotChecked: `${ctx.field} is required`,
                passwordComplexity: 'Password must contain a minimum of 1 Uppercase letter, 1 Lowercase letter, 1 Number, and 1 Special Character (!@#$&*)'
            }
            return messages[ctx.rule.name] || `${ctx.field} is invalid`
        }
    })
})
