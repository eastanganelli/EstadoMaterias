const express = require('express');
const IndexRoute = express.Router();

/* GET home page. */
IndexRoute.get('/', (req, res, next) => {
	const selSubject = req.query.subject || null;
	const subjects = `
	<select class="form-select" id="studentSubject" aria-label="${selSubject == null ? '' : 'Disabled'} select" ${selSubject == null ? '' : 'disabled'}>
		<option selected>Materia:
		</option><option value="1" ${selSubject == 1 ? 'selected' : ''}>IRI</option>
		<option value="2" ${selSubject == 2 ? 'selected' : ''}>LP II</option>
    </select>`;

	res.render('pages/index', { title: 'Estado Materias',
								year: new Date().getUTCFullYear(),
								subjectSelected: subjects
							  });
});

module.exports = IndexRoute;