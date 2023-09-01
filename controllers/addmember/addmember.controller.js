const AddMember = (req, res) => {
    const subject_ = req.query.subject;
    res.render('pages/github', { title: 'Link Github',
        year: new Date().getUTCFullYear(),
        studentSubject: subject_
    });
};

module.exports = AddMember;