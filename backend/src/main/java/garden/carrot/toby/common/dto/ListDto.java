package garden.carrot.toby.common.dto;

import java.io.Serializable;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ListDto<T> implements Serializable {

	private List<T> list;
}
