import { zod } from '$lib/adapters/index.js';
import { message, removeFiles, superValidate } from '$lib/server/index.js';
import { schema } from './schema.js';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	const form = await superValidate(zod(schema));
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		console.log(formData);

		const form = await superValidate(formData, zod(schema), { allowFiles: true });
		console.log('POST', form);

		if (!form.valid) return fail(400, removeFiles({ form }));

		return message(removeFiles(form), 'Posted OK!');
	}
};