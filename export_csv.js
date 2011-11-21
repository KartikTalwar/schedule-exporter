if(document.getElementsByClassName('PSPAGECONTAINER').length > 0){
	alert('Initiating icalendar export');
	result = [];
	result.push('BEGIN:VCALENDAR');
	result.push('VERSION:2.0');
	result.push('PRODID:-//hacksw/handcal//NONSGML v1.0//EN');
	
	classes = document.getElementsByClassName('PSGROUPBOXWBO');
	
	number_of_classes = classes.length;
	
	for(j = 0;j<number_of_classes;j++)
	{
		current_class = classes[j];
		title_text = current_class.rows[0].cells[0].innerHTML.split(' - ');
		class_number = title_text[0];
		if(title_text[1])
			{
				class_name = title_text[1];
				sub_classes = current_class.getElementsByClassName('PSLEVEL3GRIDNBO')[1].rows;
				number_of_sub_classes = sub_classes.length;
		
				for(i=1;i<number_of_sub_classes;i++)
				{
		  	  	   current_sub_class = sub_classes[i];
		  	  	   info = current_sub_class.cells;
		  	  	   component = info[2].children[0].innerHTML;
		  	  	   temp_time = info[3].children[0].innerHTML.split(' - ');
		  	  	   start_time = temp_time[0].split(' ')[1];
		  	  	   end_time = temp_time[1];
		  	  	   temp_days = temp_time[0].split(' ')[0];
		  	  	   days = [];
		  	  	   day_count = [];
			
		   			 if(temp_days.search('M') != -1)
		   			 {
		   			 	days.push('MO');
		   			 	day_count.push(1);
		   			 }
		   			 if(temp_days.search('T') != -1)
		   			 {
		   			 	if(temp_days[temp_days.search('T')+1] != 'h')
		   			 	{
		   			 		days.push('TU');
		   			 		day_count.push(2);
		   			 	}
		   			 }
		   			 if(temp_days.search('W') != -1)
		   			 {
		   			 	days.push('WE');
		   			 	day_count.push(3);
		   			 }
		   			 if(temp_days.search('Th') != -1)
		   			 {
		   			 	days.push('TH');
		   			 	day_count.push(4);
		   			 }
		   			 if(temp_days.search('F') != -1)
		   			 {
		   			 	days.push('FR');
		   			 	day_count.push(5);
		   			 }		
						
			
					loc = info[4].children[0].innerHTML;
					instructor = info[5].children[0].innerHTML;
					temp_date = info[6].children[0].innerHTML.split(' - ');
					start_date = temp_date[0];
					end_date = temp_date[1];
			
					//get days of start day and change start date accordingly
					current_date = new Date();
					current_date.setFullYear(current_date.getFullYear(),(parseFloat(start_date.split('/')[0])-1).toString(),start_date.split('/')[1]);
					num = current_date.getDay();
			
			//start here
			if(day_count[0] == num)
			{}
			else if(day_count[0] < num)
			{
				diff = num - day_count[0];
				temp_start_dates = start_date.split('/');
				temp_start_dates[1] = (parseFloat(temp_start_dates[1])-diff).toString();
				start_date = temp_start_dates.join('/');
			}
			else if(day_count[0] > num)
			{
				diff = day_count[0] - num;
				temp_start_dates = start_date.split('/');
				temp_start_dates[1] = (parseFloat(temp_start_dates[1])+diff).toString();
				start_date = temp_start_dates.join('/');
			}
			
			
			if(start_time[start_time.length-2] == 'P')
			{
				temp_start_time = start_time.split(':');
				if(temp_start_time[0] != '12')
				{
					shour = (parseFloat(temp_start_time[0])+12).toString();	
				}
				else{
					shour = temp_start_time[0];
				}
				smin = temp_start_time[1];
				smin = smin.slice(0,smin.length-2);
			}
			else
			{
				shour = parseFloat(start_time.split(':')[0]);
				if (shour < 10)
				{
					shour = '0'+shour.toString();
				}
				smin = start_time.split(':')[1];
				smin = smin.slice(0,smin.length-2);
				
			}
			if(end_time[end_time.length-2] == 'P')
			{
				temp_end_time = end_time.split(':');
				if(temp_end_time[0] != '12')
				{
					ehour = (parseFloat(temp_end_time[0])+12).toString();
				}
				else{
					ehour = temp_end_time[0];
				}
				emin = temp_end_time[1];
				emin = emin.slice(0,emin.length-2);
			}
			else
			{
				ehour = parseFloat(end_time.split(':')[0]);
				if (ehour < 10)
				{
					ehour = '0'+ehour.toString();
				}
				emin = end_time.split(':')[1];
				emin = emin.slice(0,emin.length-2);
				
			}
			
			
			tstart = shour+smin+'00';
			tend = ehour+emin+'00';
			
			new_start_date = start_date.split('/');
			new_start_date = new_start_date[2]+new_start_date[0]+new_start_date[1];
			
			new_end_date = end_date.split('/');
			new_end_date = new_end_date[2]+new_end_date[0]+new_end_date[1];		
			
			dtstart = 'DTSTART:'+ new_start_date + 'T' + tstart;
			dtend = 'DTEND:'+new_start_date + 'T' + tend;
			rrule = 'RRULE:FREQ=WEEKLY;UNTIL='+ new_end_date.split('/').join('') + 'T' + tend + ';WKST=SU;BYDAY=' + days.join(',')
			summary = 'SUMMARY:'+class_number + ' ' + component + ' in ' + loc;
			locs = 'LOCATION:'+ loc;
			description = 'DESCRIPTION:'+class_number + ': ' + class_name + ' (' + component + ') in ' + loc + ' with ' + instructor;
					
			result.push('BEGIN:VEVENT');
			result.push(dtstart);
			result.push(dtend);
			result.push(rrule);
			result.push(summary);
			result.push(locs);
			result.push(description);
			result.push('END:VEVENT');		
			
		}
	}
	}
	result.push('END:VCALENDAR');
	var newdiv = document.createElement('div');
	text = result.join("<br/>");
	newdiv.innerHTML = text;
	document.body.innerHTML = "";
	document.body.appendChild(newdiv);
}

