import { shallowMount } from '@vue/test-utils'
import Button from '.'

describe('Atom - Button', () => {
  test('Default tag is <button>', () => {
    const wrapper = shallowMount(Button)
    expect(wrapper.contains('button')).toBe(true)
  })

  test('Tag should be <a> if href is available', () => {
    const wrapper = shallowMount(Button, {
      propsData: { href: 'http://google.com' }
    })

    expect(wrapper.contains('a')).toBe(true)
    expect(wrapper.attributes().href).toBe('http://google.com')
  })

  test('Tag should be <router-link> if href is available', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        to: '/home'
      },
      stubs: ['router-link']
    })

    expect(wrapper.contains('router-link-stub')).toBe(true)
    expect(wrapper.attributes().to).toBe('/home')
  })

  test('Renders the correct classes based on props passed', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        success: true,
        warning: true,
        error: true,
        disabled: true
      },
      stubs: ['router-link']
    })

    expect(wrapper.attributes().class).toContain('success')
    expect(wrapper.attributes().class).toContain('warning')
    expect(wrapper.attributes().class).toContain('error')
    expect(wrapper.attributes().class).toContain('disabled')
  })

  test('Emits click event', () => {
    const wrapper = shallowMount(Button)
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted().click).toBeTruthy()
    expect(wrapper.emitted().click.length).toBe(1)
  })
})
