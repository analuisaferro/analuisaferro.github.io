; (function($){
    let questions;
    let data;
    $.fn.quiz = function(options){
        data = options;
        questions = options.questions;
        let $divExternal = $(this);
        let itemNum = 1;
        $.each(questions, function(index, obj){
            let $divQuestion = $("<div>").addClass("quiz-question")
                                .append($("<p>").text(obj.question));
            
            $.each(obj.items, function(index, item){
                $divQuestion
                    .append($("<div>").addClass("quiz-item")
                        .append($("<input>")
                            .attr("type", "radio")
                            .attr("value",index)
                            .attr("name", itemNum))
                        .append($("<label>").text(item)))
            });
            
            itemNum++; 
            $divExternal.append($divQuestion);
            
        });
		$(this).show(200);
        $(this).append($("<div>").addClass("quiz-controller")
                    .append($("<button>").addClass("quiz-button").text("Verificar")));
    }

    $(document).on("click", ".quiz-message-close", function(){
		$(this).parent().hide(200);
	});

    $(document).on("click", ".quiz-button", function(){
        let numRightAnswers= 0;

        let $divQuizz = $(this).parent().parent();
        $.each($divQuizz.children(".quiz-question"), function(index, $question){

            $.each($($question).children(".quiz-item"), function(index, $item){
                let $radio = $($item).children("input");
                let questionId = $($radio).attr("name");
                let correctItem = findRightAnswer(questionId, questions);
                if ($radio.prop("checked")){
                    if($($radio).attr("value") == correctItem) {
                        $($($radio).parent().addClass("correct"));
                        numRightAnswers++;
                    } else {
                        $($($radio).parent().addClass("wrong"))
                    }
                }
                
            })
        });

        $($divQuizz).append($("<div>")
            .addClass("quiz-message")
            .append($("<div>").addClass("quiz-message-close").html("&times;"))
            .append($("<p>").text(data.message + numRightAnswers + "/" + data.questions.length)));
    });

    function findRightAnswer(questionId, data) {
        for (let i=0; i<data.length;i++) {
            if (data[i].id == questionId){
                return data[i].correct;
            }
        }
    }
})(jQuery);