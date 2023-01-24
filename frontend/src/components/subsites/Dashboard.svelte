<script lang="ts">
  import { Card } from "../../classes/Card";
  let cards:Array<Card> = [
    new Card('Chat', 'chat-right-dots'),
    new Card('Katalógus', 'database-check'),
    new Card('Fórumok', 'file-post'),
    new Card('Aukciók', 'wallet2')
  ];

</script>

<main>
    {#each cards as card}
        <div class="card">
            <h2>{card.title}</h2>
            <i class="bi bi-{card.icon}"></i>
        </div>
    {/each}
</main>

<style lang="sass">

</style>
