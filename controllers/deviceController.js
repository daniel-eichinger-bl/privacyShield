
exports.getDevices = (req, res) => {
    data = [
        {ip: "123:123:123:121", name: "testDevice1", blocked: "true"},
        {ip: "123:123:123:122", name: "testDevice2", blocked: "false"},
        {ip: "123:123:123:123", name: "testDevice3", blocked: "true"},
        {ip: "123:123:123:124", name: "testDevice4", blocked: "false"},
    ]
    res.status(200).json(data);
}