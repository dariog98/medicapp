const LANGUAGES = {
    ES: {
        Home: 'Inicio',
        Patient: 'Paciente',
        Patients: 'Pacientes',
        Profesional: 'Profesional',
        Profesionals: 'Profesionales',
        Configuration: 'Configuración',
        Search: 'Buscar',
        Notes: 'Notas',
        Photos: 'Fotografías',
        Files: 'Archivos',
        Turns: 'Turnos',
        Treatments: 'Tratamientos',
        Events: 'Eventos',
        Main: 'Principal',
        Profile: 'Perfil',
        headings: {
            TodaysTurns: 'Turnos de hoy',
            TodaysReminders: 'Recordatorios de hoy',
            Treatments: 'Tratamientos',
            Treatment: 'Tratamiento',
        },
        buttons: {
            SeeMore: 'Ver más',
            Add: 'Añadir',
            SeeOnAgenda: 'Ver en agenda',
            LogOut: 'Cerrar Sesión',
            ChangePassword: 'Cambiar contraseña',
            Save: 'Guardar',
            Confirm: 'Confirmar',
            Cancel: 'Cancelar',
            Edit: 'Editar',
            Delete: 'Eliminar',
            Download: 'Descargar',
            Turn: 'Turno',
            Exception: 'Excepción',
            Reminder: 'Recordatorio',
            AddReminder: 'Añadir recordatorio',
            AddTurnTo: 'Añadir turno para las',
        },
        rows: {
            Surnames: 'Apellidos',
            Names: 'Nombres',
            Birthdate: 'Fecha de Nacimiento',
            Phone: 'Teléfono',
            Username: 'Usuario',
            Mail: 'Correo',
            Address: 'Dirección',
            Role: 'Rol',
            Charge: 'Cargo',
            Filename: 'Nombre',
            Description: 'Descripción',
            UpdatedAt: 'Última modificación',
            Password: 'Contraseña',
            Date: 'Fecha',
            Time: 'Hora',
            Duration: 'Duración',
            Patient: 'Paciente',
            Treatment: 'Tratamiento',
            CurrentPassword: 'Contraseña actual',
            NewPassword: 'Contraseña nueva',
            ConfirmPassword: 'Contraseña nueva',
        },
        durations: {
            ThirtyMinutes: '30 minutos',
            OneHour: '1 hora',
            OneHourThirtyMinutes: '1 hora y 30 minutos',
            TwoHours: '2 horas',
        },
        configuration: {
            Language: 'Idioma',
            DarkMode: 'Modo oscuro'
        },
        messages: {
            NoResults: 'No se han encontrado resultados',
            Loading: 'Cargando...',
            LogIn: 'Iniciar Sesión',
            YearsOld: 'Años',
            NotNullable: 'El campo no puede estar vacio',
            FieldRequired: 'El campo es obligatorio',
            FieldsDoNotMatch: 'Los campos no coinciden',
            InvalidDate: 'La fecha ingresada no es válida',
            InvalidFormat: 'El formato no es el correcto',
            PasswordMin: 'La contraseña debe tener un mínimo de 8 caracteres',
            WriteHere: 'Escriba aquí...',
            PasswordChanged: 'La contraseña ha sido actulizada satisfactoriamente',
            UserUpdated: 'Su perfil ha sido guardado satisfactoriamente',
            ConfirmDelete: '¿Está seguro que desea eliminar el siguiente elemento?',
            PatientCreated: 'Nuevo paciente añadido satisfactoriamente',
            PatientUpdated: 'Paciente editado satisfactoriamente',
            PatientDeleted: 'Paciente eliminado satisfactoriamente',
            NoteCreated: 'Nueva nota añadida satisfactoriamente',
            NoteUpdated: 'Nota editada satisfactoriamente',
            NoteDeleted: 'Nota eliminada satisfactoriamente',
            TurnCreated: 'Nuevo turno añadido satisfactoriamente',
            TurnUpdated: 'Turno editado satisfactoriamente',
            TurnDeleted: 'Turno eliminado satisfactoriamente',
            ExceptionCreated: 'Nueva excepción añadido satisfactoriamente',
            ExceptionUpdated: 'Excepción editada satisfactoriamente',
            ExceptionDeleted: 'Excepción eliminada satisfactoriamente',
            ReminderCreated: 'Nuevo recordatorio añadido satisfactoriamente',
            ReminderUpdated: 'Recordatorio editado satisfactoriamente',
            ReminderDeleted: 'Recordatorio eliminado satisfactoriamente',
            TreatmentCreated: 'Nuevo tratamiento añadido satisfactoriamente',
            TreatmentUpdated: 'Tratamiento editado satisfactoriamente',
            TreatmentDeleted: 'Tratamiento eliminado satisfactoriamente',
            AnErrorOcurred: 'Ha ocurrido un error',
            PageNotFound: 'Página no encontrada',
        },
        days: [ 'Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado' ],
        string: 'es-ES',
    },
    EN: {
        Home: 'Home',
        Patient: 'Patient',
        Patients: 'Patients',
        Profesional: 'Profesional',
        Profesionals: 'Profesionals',
        Configuration: 'Configuration',
        Search: 'Search',
        Notes: 'Notes',
        Photos: 'Photos',
        Files: 'Files',
        Turns: 'Appointments',
        Events: 'Events',
        Main: 'Main',
        Profile: 'Profile',
        headings: {
            TodaysTurns: "Today's Appointments",
            TodaysReminders: "Today's Reminders",
            Treatments: 'Treatments',
            Treatment: 'Treatment',
        },
        buttons: {
            SeeMore: 'See More',
            Add: 'Add',
            SeeOnAgenda: 'See on agenda',
            LogOut: 'Logout',
            ChangePassword: 'Change password',
            Save: 'Save',
            Confirm: 'Confirm',
            Cancel: 'Cancel',
            Edit: 'Edit',
            Delete: 'Delete',
            Download: 'Download',
            Turn: 'Appointment',
            Exception: 'Exception',
            Reminder: 'Reminder',
            AddReminder: 'Add reminder',
            AddTurnTo: 'Add new appointment for',
        },
        rows: {
            Surnames: 'Surnames',
            Names: 'Names',
            Birthdate: 'Birthdate',
            Phone: 'Phone',
            Username: 'Username',        
            Mail: 'Mail',
            Address: 'Address',
            Role: 'Role',
            Charge: 'Charge',
            Filename: 'Filename',
            Description: 'Description',
            UpdatedAt: 'Updated at',
            Password: 'Password',
            Date: 'Date',
            Time: 'Time',
            Duration: 'Duration',
            Patient: 'Patient',
            Treatment: 'Treatment',
            CurrentPassword: 'Current password',
            NewPassword: 'New password',
            ConfirmPassword: 'Confirm new password',
        },
        durations: {
            ThirtyMinutes: '30 minutes',
            OneHour: '1 hour',
            OneHourThirtyMinutes: '1 hour and 30 minutes',
            TwoHours: '2 hours',
        },
        configuration: {
            Language: 'Language',
            DarkMode: 'Dark mode'
        },
        messages: {
            NoResults: 'No results found',
            Loading: 'Loading...',
            LogIn: 'Login',
            YearsOld: 'Years old',
            NotNullable: 'The field cannot be empty',
            FieldRequired: 'The field is required',
            FieldsDoNotMatch: 'Fields do not match',
            InvalidDate: 'The date entered is not valid',
            InvalidFormat: 'The format is not valid',
            PasswordMin: 'The password must have a minimum of 8 characters',
            WriteHere: 'Write here...',
            PasswordChanged: 'Password changed successfully',
            UserUpdated: 'Your profile has been updated successfully',
            ConfirmDelete: 'Do you confirm that you want to delete the following item?',
            PatientCreated: 'New patient added successfully',
            PatientUpdated: 'Patient edited successfully',
            PatientDeleted: 'Patient deleted successfully',
            NoteCreated: 'New note added successfully',
            NoteUpdated: 'Note edited successfully',
            NoteDeleted: 'Note deleted successfully',
            TurnCreated: 'New appointment added successfully',
            TurnUpdated: 'Appointment edited successfully',
            TurnDeleted: 'Appointment deleted successfully',
            ExceptionCreated: 'New exception added successfully',
            ExceptionUpdated: 'Exception edited successfully',
            ExceptionDeleted: 'Exception deleted successfully',
            ReminderCreated: 'New reminder added successfully',
            ReminderUpdated: 'Reminder edited successfully',
            ReminderDeleted: 'Reminder deleted successfully',
            TreatmentCreated: 'New treatment added successfully',
            TreatmentUpdated: 'Treatment edited successfully',
            TreatmentDeleted: 'Treatment deleted successfully',
            AnErrorOcurred: 'An error ocurred',
            PageNotFound: 'Page not found',
        },
        days: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
        string: 'en-EN',
    }
}

export { LANGUAGES }