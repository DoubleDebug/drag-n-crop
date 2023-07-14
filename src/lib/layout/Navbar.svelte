<script>
  import { Navbar, NavBrand, DarkMode } from 'flowbite-svelte';
</script>

<Navbar class="navbar">
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
  <DarkMode title="Dark mode" />
</Navbar>

<style>
  .logo {
    width: 30px;
    height: 30px;
  }

  .logo-black {
    content: url('/public/favicon-black.png');
  }
</style>
