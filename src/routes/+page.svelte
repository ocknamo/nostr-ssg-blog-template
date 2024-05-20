<script lang="ts">
	export let data;

	const events = data.events;
</script>

<h1>Nost Blog Template</h1>
<hr />
<div class="contents">
	<ul>
		{#each events as event}
			<li>
				<a href="/blog/{event.id}">{event.id}</a>
			</li>
		{/each}
	</ul>
</div>
<hr />
<p>
	Visit <a href="https://github.com/ocknamo/nostr-ssg-blog-template">nostr-ssg-blog-template</a> to read
	the documentation
</p>

<style>
	.contents {
		margin: 0 20px;
		max-width: 800px;
	}
</style>
