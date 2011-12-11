# Schedule Exporter

### Schedule exporter is a chrome plugin to export schedule from ibm websphere based schedular.

## Steps to export:

* Open your schedule in list view not table view (IMP)
* Click on schedule exporter icon on chrome
* Copy past replaced text and save in a new file named : schedule.ics
* Import this file in any calendar app.
* Use the bookmarklet below

## Bookmarklet

    javascript:(function(){var%20script=document.createElement('script');script.src='https://raw.github.com/yagnik/schedule-exporter/master/extension/export_csv.js?'+Math.floor((+new Date)/(864e5));document.body.appendChild(script);makeSchedule();})()

[Bookmarklet](javascript:(function(){var%20script=document.createElement('script');script.src='https://raw.github.com/yagnik/schedule-exporter/master/extension/export_csv.js?'+Math.floor((+new Date)/(864e5));document.body.appendChild(script);makeSchedule();})())

## Future considerations:
* Create file: Require backend server and some donations :)
* Use API to directly import into applications.
