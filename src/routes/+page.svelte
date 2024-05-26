<script lang="ts">
	export let data;

	const blogs = data.blogs;
</script>

<h1>Nostr Blog</h1>
<hr />
<div class="contents">
	<ul>
		{#each blogs as blog}
			<li>
				<a href="/blog/{blog.id}">{blog.title}</a>
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
