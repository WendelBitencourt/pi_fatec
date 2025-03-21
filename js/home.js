document.addEventListener("DOMContentLoaded", function () {
  const sensorsList = document.getElementById("sensorsList");
  let sensors = [];

  function createSensorCard(sensor) {
    return `
            <div class="col-md-4 sensor-item" data-id="${sensor.id}">
                <div class="sensor-card p-3">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h5><span class="status-indicator ${
                              sensor.status ? "online" : "offline"
                            }"></span> ${sensor.name}</h5>
                            <p class="text-muted mb-0">ID: #${sensor.id}</p>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-smart view-btn" data-bs-toggle="modal" data-bs-target="#viewSensorModal">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-sm btn-smart mx-1 edit-btn" data-bs-toggle="modal" data-bs-target="#editSensorModal">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-danger delete-btn" data-bs-toggle="modal" data-bs-target="#deleteSensorModal">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  function updateSensorList() {
    sensorsList.innerHTML = sensors
      .map((sensor) => createSensorCard(sensor))
      .join("");
  }

  // Adicionar Sensor
  document
    .getElementById("addSensorForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const newSensor = {
        id: Date.now(),
        name: document.getElementById("sensorName").value,
        location: document.getElementById("sensorLocation").value,
        restIntensity: document.getElementById("restLightIntensity").value,
        proximityIntensity: document.getElementById("proximityLightIntensity")
          .value,
        status: true,
        lastUpdate: new Date().toLocaleString(),
        luminosity: Math.floor(Math.random() * 1000) + " lux",
        consumption: Math.floor(Math.random() * 50) + "W",
      };

      sensors.push(newSensor);
      updateSensorList();
      bootstrap.Modal.getInstance(
        document.getElementById("addSensorModal")
      ).hide();
      this.reset();

      // Resetar valores exibidos dos range inputs
      document.getElementById("restLightIntensityValue").innerText = "50%";
      document.getElementById("proximityLightIntensityValue").innerText = "75%";
    });

  // Editar Sensor
  document.addEventListener("click", function (e) {
    if (e.target.closest(".edit-btn")) {
      const card = e.target.closest(".sensor-item");
      const sensorId = parseInt(card.dataset.id);
      const sensor = sensors.find((s) => s.id === sensorId);

      // Preencher formulário de edição
      document.getElementById("editSensorName").value = sensor.name;
      document.getElementById("editSensorLocation").value = sensor.location;
      document.getElementById("editRestLightIntensity").value =
        sensor.restIntensity;
      document.getElementById("editProximityLightIntensity").value =
        sensor.proximityIntensity;
      document.getElementById("editRestLightIntensityValue").innerText =
        sensor.restIntensity + "%";
      document.getElementById("editProximityLightIntensityValue").innerText =
        sensor.proximityIntensity + "%";

      // Configurar submit da edição
      document.getElementById("editSensorForm").onsubmit = function (event) {
        event.preventDefault();

        // Atualizar dados
        sensor.name = document.getElementById("editSensorName").value;
        sensor.location = document.getElementById("editSensorLocation").value;
        sensor.restIntensity = document.getElementById(
          "editRestLightIntensity"
        ).value;
        sensor.proximityIntensity = document.getElementById(
          "editProximityLightIntensity"
        ).value;

        updateSensorList();
        bootstrap.Modal.getInstance(
          document.getElementById("editSensorModal")
        ).hide();
      };
    }
  });

  // Deletar Sensor
  document.addEventListener("click", function (e) {
    if (e.target.closest(".delete-btn")) {
      const card = e.target.closest(".sensor-item");
      const sensorId = parseInt(card.dataset.id);
      const sensor = sensors.find((s) => s.id === sensorId);

      document.getElementById("deleteSensorName").textContent = sensor.name;

      document.getElementById("confirmDelete").onclick = function () {
        sensors = sensors.filter((s) => s.id !== sensorId);
        updateSensorList();
        bootstrap.Modal.getInstance(
          document.getElementById("deleteSensorModal")
        ).hide();
      };
    }
  });

  // Visualizar Sensor
  document.addEventListener("click", function (e) {
    if (e.target.closest(".view-btn")) {
      const card = e.target.closest(".sensor-item");
      const sensorId = parseInt(card.dataset.id);
      const sensor = sensors.find((s) => s.id === sensorId);

      // Preencher dados
      document.getElementById("viewName").textContent = sensor.name;
      document.getElementById("viewId").textContent = "#" + sensor.id;
      document.getElementById("viewStatus").innerHTML = sensor.status
        ? '<span class="text-success">Online</span>'
        : '<span class="text-danger">Offline</span>';
      document.getElementById("viewLocation").textContent = sensor.location;
      document.getElementById("viewLastUpdate").textContent = sensor.lastUpdate;
      document.getElementById("viewRestIntensity").textContent =
        sensor.restIntensity + "%";
      document.getElementById("viewProximityIntensity").textContent =
        sensor.proximityIntensity + "%";
      document.getElementById("viewLuminosity").textContent = sensor.luminosity;
      document.getElementById("viewConsumption").textContent =
        sensor.consumption;
    }
  });
});
