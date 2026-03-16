import fs from "node:fs";
import path from "node:path";
import { minify } from "terser";

const dist = path.join(import.meta.dirname, "../dist");

const filenames = await fs.promises.readdir(dist);

async function apply(filepath: string) {
	const extname = path.extname(filepath);
	if (extname === ".js") {
		console.log(`minifying ${filepath}..`);
		const content = await fs.promises.readFile(filepath, "utf-8");
		const filename2 = path.basename(filepath).concat(".min.js");
		const filepath2 = path.join(path.dirname(filepath), filename2);
		/**
		 * @description https://terser.org/docs/options/
		 */
		const options = {
			module: true,
			compress: {},
			mangle: false,
			output: {},
			parse: {},
			rename: {},
		};
		const content2 = await minify(content, options);
		if (content2?.code) {
			await fs.promises.writeFile(filepath2, content2.code);
		}
	}
}

for (const filename of filenames) {
	const filepath = path.join(dist, filename);
	apply(filepath);
}

fs.watch(dist, async (_, filename) => {
	if (filename) {
		const filepath = path.join(dist, filename);
		apply(filepath);
	}
});
