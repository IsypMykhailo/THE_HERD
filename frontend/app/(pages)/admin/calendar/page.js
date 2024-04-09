'use client'

import {useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Typography,
    useTheme,
} from "@mui/material";
import Header from "../../../_components/admin/Header";
import {tokens} from "@/app/_components/admin/theme";
import {useRouter} from "next/navigation";
import nextConfig from "@/next.config.mjs";
import Loading from "@/app/_components/Loading";

const Calendar = () => {
    const theme = useTheme();
    const router = useRouter()
    const colors = tokens(theme.palette.mode);
    const [currentEvents, setCurrentEvents] = useState([]);
    const [loading, setLoading] = useState(true)
    const [loadingClass, setLoadingClass] = useState('')
    const [isAdmin, setIsAdmin] = useState(null)

    useEffect(() => {
        setLoading(true)
        const validateAdmin = async () => {
            try {
                const response = await fetch(nextConfig.env.apiUrl + "/api/admin/validate", {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    },
                });

                if (response.status === 200) {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false)
                    router.push("/"); // Redirect to main page if user is not an admin
                }
            } catch (error) {
                console.error('Failed to validate admin status', error);
            }
        };

        validateAdmin();
    }, [router]);

    useEffect(() => {
        const loadPage = async () => {
            if (isAdmin === null) return
            setLoadingClass('hidden')
            const timer = setTimeout(() => setLoading(false), 500);
            return () => clearTimeout(timer);
        }
        loadPage()
    }, [isAdmin]);

    const handleDateClick = (selected) => {
        const title = prompt("Please enter a new title for your event");
        const calendarApi = selected.view.calendar;
        calendarApi.unselect();

        if (title) {
            calendarApi.addEvent({
                id: `${selected.dateStr}-${title}`,
                title,
                start: selected.startStr,
                end: selected.endStr,
                allDay: selected.allDay,
            });
        }
    };

    const handleEventClick = (selected) => {
        if (
            window.confirm(
                `Are you sure you want to delete the event '${selected.event.title}'`
            )
        ) {
            selected.event.remove();
        }
    };

    const formatDate = (dateString) => {
        const options = {year: "numeric", month: "short", day: "numeric"};
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", options);
    }


    return (
        <>
            {loading && (
                <Loading loadingClass={loadingClass}/>
            )}
            <Box m="20px">
                <Header title="Calendar" subtitle="Full Calendar Interactive Page"/>

                <Box display="flex" justifyContent="space-between">
                    {/* CALENDAR SIDEBAR */}
                    <Box
                        flex="1 1 20%"
                        backgroundColor={colors.primary[400]}
                        p="15px"
                        borderRadius="4px"
                    >
                        <Typography variant="h5">Events</Typography>
                        <List>
                            {currentEvents.map((event) => (
                                <ListItem
                                    key={event.id}
                                    sx={{
                                        backgroundColor: colors.greenAccent[500],
                                        margin: "10px 0",
                                        borderRadius: "2px",
                                    }}
                                >
                                    <ListItemText
                                        primary={event.title}
                                        secondary={
                                            <Typography>
                                                {formatDate(event.start)}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Box>

                    {/* CALENDAR */}
                    <Box flex="1 1 100%" ml="15px">
                        <FullCalendar
                            height="75vh"
                            plugins={[
                                dayGridPlugin,
                                timeGridPlugin,
                                interactionPlugin,
                                listPlugin,
                            ]}
                            headerToolbar={{
                                left: "prev,next today",
                                center: "title",
                                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                            }}
                            initialView="dayGridMonth"
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            select={handleDateClick}
                            eventClick={handleEventClick}
                            eventsSet={(events) => setCurrentEvents(events)}
                            initialEvents={[
                                {
                                    id: "12315",
                                    title: "All-day event",
                                    date: "2022-09-14",
                                },
                                {
                                    id: "5123",
                                    title: "Timed event",
                                    date: "2022-09-28",
                                },
                            ]}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Calendar;
