import { registerStateHmr } from '@/core/vm/registerStateHmr'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { authState } from '@/features/auth/vm/authState'
import type { AuthRole, AuthRoleOption } from '@/features/auth/type/authTypes'

const roleOptions: AuthRoleOption[] = [
  {
    value: 'admin',
    label: 'Admin',
    description: 'Akses penuh ke semua fitur',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 20 7v5c0 5-3.4 8.1-8 10-4.6-1.9-8-5-8-10V7l8-5Z"/><path d="M9 12l2 2 4-5"/></svg>'
  },
  {
    value: 'employee',
    label: 'Pegawai',
    description: 'Isi checklist harian saja',
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
  }
]

export const useAuthVm = defineStore('authVm', () => {
  const router = useRouter()
  const view = reactive({ ...authState.view })
  registerStateHmr(view, 'authState')
  const storedRole = typeof localStorage !== 'undefined' ? localStorage.getItem('e-double-check-role') : null
  const urlRole = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('role')
    : null
  const normalizedUrlRole = urlRole === 'admin' || urlRole === 'employee' ? urlRole : null
  const selectedRole = ref<AuthRole | null>(
    normalizedUrlRole ?? (storedRole === 'admin' || storedRole === 'employee' ? storedRole : null)
  )
  const isLoading = ref(false)
  const roleOptionsRef = ref(roleOptions)

  const canSubmit = computed(() => selectedRole.value !== null && !isLoading.value)

  const openFormModal = () => {
    view.isFormModalOpen = true
    view.isFormSubmitted = false
  }

  const closeFormModal = () => {
    view.isFormModalOpen = false
    view.isFormSubmitted = false
  }

  const updateFormField = (fieldId: string, event: Event) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
    const field = view.formFields.find((item) => item.id === fieldId)

    if (!target || !field || field.readonly) return
    field.value = target.value
  }

  const saveFormModal = () => {
    view.isFormSubmitted = true
  }

  const selectRole = (role: AuthRole) => {
    selectedRole.value = role
    void router.replace({
      query: {
        ...router.currentRoute.value.query,
        role
      }
    })
  }

  const login = async () => {
    if (!selectedRole.value || isLoading.value) return
    isLoading.value = true

    await new Promise((resolve) => setTimeout(resolve, 800))

    localStorage.setItem('e-double-check-role', selectedRole.value)
    const target = {
      path: '/dashboard',
      query: {
        role: selectedRole.value
      }
    }
    isLoading.value = false
    await router.push(target)
  }

  const logout = async () => {
    selectedRole.value = null
    localStorage.removeItem('e-double-check-role')
    await router.push('/login')
  }
  return {
    ...authState,
    view,
    selectedRole,
    isLoading,
    canSubmit,
    roleOptions: roleOptionsRef,
    selectRole,
    login,
    logout,
    openFormModal,
    closeFormModal,
    updateFormField,
    saveFormModal
  }
})




