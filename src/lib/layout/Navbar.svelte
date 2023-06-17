<script>
  import { Navbar, NavBrand, NavHamburger, DarkMode } from 'flowbite-svelte';
</script>

<Navbar let:toggle>
  <NavBrand href="/">
    <span
      class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
    >
      Drag n crop!
    </span>
  </NavBrand>
  <NavHamburger on:click={toggle} />
  <DarkMode />
</Navbar>
