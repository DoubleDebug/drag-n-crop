<script>
  import '../app.postcss';
  import Navbar from '$lib/layout/Navbar.svelte';
  import Footer from '$lib/layout/Footer.svelte';
</script>

<Navbar />
<main class="app"><slot /></main>
<Footer />
