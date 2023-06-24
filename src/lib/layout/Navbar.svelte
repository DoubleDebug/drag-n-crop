<script>
  import { Navbar, NavBrand, NavHamburger, DarkMode } from 'flowbite-svelte';
</script>

<Navbar let:toggle>
  <NavBrand href="/">
    <div class="flex gap-2">
      <span class="logo logo-black dark:logo-white" />
      <span
        class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
      >
        Drag and crop!
      </span>
    </div>
  </NavBrand>
  <NavHamburger on:click={toggle} />
  <DarkMode />
</Navbar>

<style>
  .logo {
    width: 30px;
    height: 30px;
  }

  .logo-black {
    content: url('favicon-black.png');
  }
</style>
