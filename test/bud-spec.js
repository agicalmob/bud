define(['buster', 
        'bud', 
        'foliage',
        'phloem',
        'jquery'], 
       function(buster, b, f, phloem, $) {

    function withContext(callback) {
        return function() {
            callback($('<div />'));
        };
    }
           
    var assert = buster.assert;
    var refute = buster.refute;

    buster.testCase("scope", {
        "returned element gets displayed" : withContext(function(ctx){
            f.div(b.scope(
                    function() {
                        var message = "hello " + "world";
                        return f.p("#somep", message);
                    }
                ))(ctx);
            
            assert.equals($(ctx, "#somep").text().trim(), "hello world");
        }),
        "returned element can be undone" : withContext(function(ctx){
            var elem = f.div(b.scope(
                    function() {
                        var message = "now you see it";
                        return f.p("#somep", message);
                    }
                ))(ctx);
            assert.equals($(ctx, "#somep").text().trim(), "now you see it");
            elem.undo();
            assert.equals($(ctx, "#somep").text().trim(), "");
            
        })

    });


    buster.testCase("bind", {
        "no value no element" : withContext(function(ctx){
            var stream = phloem.stream();
            f.div(b.bind(stream, f.p))(ctx);
            
            assert.equals($(ctx, "p").text().trim(), "");
        }),
        "creates element from pushed value" : withContext(function(ctx){
            var stream = phloem.stream();
            f.div(b.bind(stream.read, f.p))(ctx);
            stream.push("pushed value");
            
            assert.equals($(ctx, "p").text().trim(), "pushed value");
        })

    });

});
