var snmp = require ("net-snmp");

var session = snmp.createSession ("192.168.90.254", "public");

var oids = ["1.3.6.1.2.1.2.2.1.1.1", "1.3.6.1.2.1.2.2.1.2.1", "1.3.6.1.2.1.2.2.1.3.1", ".1.3.6.1.2.1.2.2.1.6.1"];

session.get (oids, function (error, varbinds) {
    if (error) {
        console.error (error);
    } else {
        for (var i = 0; i < varbinds.length; i++) {
            if (snmp.isVarbindError (varbinds[i])) {
                console.error (snmp.varbindError (varbinds[i]));
            } else {
                console.log (varbinds[i].oid + " = " + varbinds[i].value);
            }
        }
    }
    session.close ();
});

session.trap (snmp.TrapType.LinkDown, function (error) {
    if (error) {
        console.error (error);
    }
});