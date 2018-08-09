/* global $*/
// Add new item/dish
$("#personRow td:first-of-type").click(function(){
	console.log("what")
	var rowCount = $("tr").length - 2
	$("table tr:nth-last-child(2)").after(
		'<tr class="dishRow">'
		+'	<td>'
		+'		<input type="number" name="d' + rowCount + '" placeholder="Dish Price">'
		+'	</td>'
		+'</tr>'
	)

	var colCount = $("#personRow td").length - 2
	for (var i=0; i<colCount; i++) {
		$("table tr:nth-last-child(2) td").last().after(
			'<td><input type="checkbox" class="d'+rowCount+' p'+ i +'"" name=""></td>'
		)
	}	

	$("table tr:nth-last-child(2) td").last().after(
		'<td class="dishSubTotal">-</td>'
	)

	checkListeners()
	dishListeners()
})

// Add new person
$(".fa-user-plus").click(function(){
	console.log("step 1");
	var colCount = $("#personRow td").length - 1
	$("#personRow td:nth-last-child(2)").after(
		'<td><input type="text" name="p'+colCount+'" placeholder="Person '+colCount+'"></td>'
	)
	console.log("step 2");

	var rowCount = $("tr").length - 2
	for (var i=0; i<rowCount; i++) {
		$(".dishRow:eq("+i+") td:nth-last-child(2)").after(
			'<td><input type="checkbox" class="d'+i+' p'+ (colCount-1) +'" name=""></td>'
		)
	console.log("step 3");
	}
	$("#totalsRow td:nth-last-child(2)").after(
		'<td><p>-</p></td>'
	)
	$("#shoppingCart td:last-of-type").after('<td></td>')
	console.log("step 4");

	checkListeners()
	console.log("step 5");
	dishListeners()
	console.log("step 6");
})

// Add listeners for checkboxes & textboxes
function checkListeners(){
	$("input[type='checkbox']").on("click mouseup", function(){
		dishSubTotals()
		personSubTotals()
		billTotal()
	}
)}
function dishListeners(){
	$("input[type='number']").on("keyup", function(){
		dishSubTotals()
		personSubTotals()
		billTotal()
	}
)}

// Calculate the split for each dish
function dishSubTotals(){
	var rowCount = $(".dishRow").length

	for (var i=0;i<rowCount;i++) {
		var dishPrice = $(".dishRow:eq("+i+") input[type='number']").val()
		var checkedBoxes = $(".dishRow:eq("+i+") input[type='checkbox']:checked").length

		if (dishPrice > 0 && checkedBoxes >0) {
			var dishSubTotal = "$" + (dishPrice/checkedBoxes).toFixed(2)
			$(".dishRow:eq("+i+") td").last().text(dishSubTotal)
		}
	}
}

// Calculate individual subtotals (w/ tax + tip) from dish subtotals & people sharing
function personSubTotals(){
	var rowCount = $(".dishRow").length
	var personCount = $("#personRow input[type='text']").length
	var taxPercent = $("#taxPercent").val()/100
	var tipPercent = $("#tipPercent").val()/100
	var taxAndTip = 1 + taxPercent + tipPercent

	for (var i=0; i<personCount; i++){
		personSubTotal = 0
		for (var j=0; j<rowCount; j++){
			if ( $(".dishRow:eq("+j+") input[type='checkbox']:eq("+i+")").is(':checked') ) {
				var dishSubTotal = $(".dishRow:eq("+j+") td:last").text().replace("$","")
				personSubTotal += Number(dishSubTotal)
			}
		}
		personSubTotal = "$" + ( personSubTotal * taxAndTip ).toFixed(2)
		$("#totalsRow p:eq("+i+")").text(personSubTotal)
	}
}
// Calculate the total bill (w/ tax + tip) from individual subtotals
function billTotal(){
	var totalBill = 0
	$("#totalsRow p").each( function() {
		totalBill += Number( $(this).text().replace("$","") )
	})
	if (totalBill > 0) {
		$("#totalBillNums div:first").text("$" + totalBill.toFixed(2) )
	}
}

checkListeners()
dishListeners()

// personSubTotals()