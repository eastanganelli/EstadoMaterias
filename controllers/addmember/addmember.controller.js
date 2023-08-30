const AddMember = (req, res) => {
    const subject_ = Number(req.query.subject);
    res.sendFile(__dirname + `/addmember.html`);
};

module.exports = AddMember;