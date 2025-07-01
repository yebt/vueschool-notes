#!/bin/bash

#!/bin/bash

input=".env"
output=".env.example"

> "$output"  # Limpiar el archivo de salida si ya existe

while IFS= read -r line || [ -n "$line" ]; do
    # Si la línea es un comentario o está vacía, se copia tal cual
    if [[ "$line" =~ ^[[:space:]]*# || -z "$line" ]]; then
        echo "$line" >> "$output"
    elif [[ "$line" =~ ^[[:space:]]*[^#=]+=[^=]* ]]; then
        clave="${line%%=*}"
        echo "${clave}=" >> "$output"
    else
        # Cualquier otra línea se copia tal cual (por seguridad)
        echo "$line" >> "$output"
    fi
done < "$input"

echo "Archivo .env.example generado."

