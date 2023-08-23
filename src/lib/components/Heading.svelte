<script>
  import { Heading } from 'flowbite-svelte';
</script>

<div class="grid">
  <Heading tag="h1" class="mb-4">
    <span
      class="heading sm:text-7xl md:text-8xl xl:text-9xl whitespace-nowrap font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600"
    >
      Drag 'n' crop
    </span>
  </Heading>
  <Heading tag="h2" class="text-2xl sm:text-3xl md:text-4xl xl:text-5xl">
    <span class="subheading">your images and videos!</span>
  </Heading>
</div>

<style>
  .subheading {
    color: #484e57;
  }

  :global(.dark) .subheading {
    color: white;
  }

  @media only screen and (max-width: 640px) {
    .heading {
      font-size: 3.75rem;
    }
  }

  @media only screen and (max-width: 500px) {
    .heading {
      font-size: 3rem;
    }
  }

  @media only screen and (max-width: 370px) {
    .heading {
      font-size: 2.5rem;
    }

    .subheading {
      font-size: 1.5rem;
    }
  }
</style>
