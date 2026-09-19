package br.fiap.daiji.dto;

import java.time.LocalDateTime;

public record EncaminhamentoRequest(Integer idProfissional, LocalDateTime dataConsulta) { }
