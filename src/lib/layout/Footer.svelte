<script>
  import { FooterCopyright, FooterIcon, Tooltip } from 'flowbite-svelte';
</script>

<div
  class="footer flex items-center justify-between mx-auto mt-20 mb-5 container"
>
  <FooterCopyright by="Drag and crop" />
  <div class="icons flex mt-4 space-x-6 sm:justify-center sm:mt-0">
    <Tooltip triggeredBy="[id='link-github']">Github</Tooltip>
    <FooterIcon
      href="https://github.com/DoubleDebug"
      class="text-gray-400 hover:text-gray-900"
      id="link-github"
      target="_blank"
    >
      <svg
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    </FooterIcon>
    <Tooltip triggeredBy="[id='link-twitter']">Twitter</Tooltip>
    <FooterIcon
      href="https://twitter.com/YoutubeDoubleD"
      class="text-gray-400 hover:text-gray-900"
      id="link-twitter"
      target="_blank"
    >
      <svg
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
        />
      </svg>
    </FooterIcon>
    <Tooltip triggeredBy="[id='link-youtube']">YouTube</Tooltip>
    <FooterIcon
      href="https://www.youtube.com/@DoubleDYouTube"
      class="text-gray-400 hover:text-gray-900"
      id="link-youtube"
      target="_blank"
    >
      <svg
        class="w-5 h-5"
        fill="currentColor"
        aria-hidden="true"
        height="1em"
        viewBox="0 0 576 512"
      >
        <path
          d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
        />
      </svg>
    </FooterIcon>
    <Tooltip triggeredBy="[id='link-linkedin']">LinkedIn</Tooltip>
    <FooterIcon
      href="https://www.linkedin.com/in/double-debug/"
      class="text-gray-400 hover:text-gray-900"
      id="link-linkedin"
      target="_blank"
    >
      <svg
        class="w-5 h-5"
        fill="currentColor"
        height="1em"
        viewBox="0 0 448 512"
        aria-hidden="true"
      >
        <path
          d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
        />
      </svg>
    </FooterIcon>
  </div>
</div>

<style>
  @media only screen and (max-width: 640px) {
    .footer {
      display: grid;
      justify-content: center;
      text-align: center;
      margin-top: 1rem;
    }

    .icons {
      display: flex;
      justify-content: center;
      order: -1;
      margin-bottom: 16px;
    }
  }
</style>
